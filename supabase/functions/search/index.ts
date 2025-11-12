// @ts-ignore Supabase Edge Functions load Deno std modules at runtime.
import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

// @ts-ignore Supabase Edge Functions resolve this import at runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SB_URL'); // TODO: Configure Supabase URL.
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SB_SERVICE_ROLE_KEY'); // TODO: Configure service key.
const EMBEDDING_API_KEY = Deno.env.get('EMBEDDING_API_KEY'); // TODO: Provide embedding API key.
const RERANKER_API_KEY = Deno.env.get('RERANKER_API_KEY'); // TODO: Provide reranker API key.

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase credentials are missing. Ensure SB_URL and SB_SERVICE_ROLE_KEY secrets are set.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, Authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (typeof query !== 'string' || query.trim().length === 0) {
      return new Response('Query is required.', { status: 400, headers: corsHeaders });
    }

    console.log('Search function received query:', query);

    // 1) Query embedding 생성
    const queryVector = await generateQueryEmbedding(query);

    // 2) pgvector에서 top 50 검색
    const initialCandidates = await searchSimilarChunks(queryVector, 50);

    if (initialCandidates.length === 0) {
      return Response.json({ results: [] }, { headers: corsHeaders });
    }

    // 3) 리랭킹 (top 50 → top 10)
    const rerankedCandidates = await rerankCandidates(query, initialCandidates, 10);

    // 4) 상위 5개 결과 준비
    const topResults = rerankedCandidates.slice(0, 5).map(toResultPayload);

    console.log('Search function returning results:', topResults);

    return Response.json(
      {
        results: topResults,
      },
      { headers: corsHeaders },
    );
  } catch (error) {
    console.error('Search function error:', error);
    return new Response('Internal Server Error', { status: 500, headers: corsHeaders });
  }
});

async function generateQueryEmbedding(query: string): Promise<number[]> {
  const fallback = new Array(1024).fill(0);

  if (!EMBEDDING_API_KEY) {
    console.warn('EMBEDDING_API_KEY not configured. Using zero vector.');
    return fallback;
  }

  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${EMBEDDING_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-3-large',
        input: query,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Embedding API error:', res.status, text);
      return fallback;
    }

    const json = await res.json();
    const embedding = json?.data?.[0]?.embedding;

    if (!Array.isArray(embedding)) {
      console.error('Embedding API returned unexpected payload:', json);
      return fallback;
    }

    return embedding as number[];
  } catch (error) {
    console.error('Embedding API request failed:', error);
    return fallback;
  }
}

type ChunkRecord = {
  id: string;
  document_id: string;
  text: string;
  page_from: number | null;
  page_to: number | null;
  section: string | null;
  doi: string | null;
  score: number;
};

async function searchSimilarChunks(queryVector: number[], limit: number): Promise<ChunkRecord[]> {
  try {
    const { data, error } = await supabase.rpc('match_chunks', {
      query_embedding: queryVector,
      match_threshold: 0.75,
      match_count: limit,
    });

    if (error) {
      console.error('match_chunks RPC error:', error);
      return [];
    }

    if (!Array.isArray(data)) {
      console.warn('match_chunks RPC returned unexpected payload:', data);
      return [];
    }

    return data as ChunkRecord[];
  } catch (error) {
    console.error('match_chunks RPC call failed:', error);
    return [];
  }
}

type RerankedCandidate = ChunkRecord & { rerank_score?: number };

async function rerankCandidates(
  _query: string,
  candidates: ChunkRecord[],
  limit: number,
): Promise<RerankedCandidate[]> {
  if (!RERANKER_API_KEY) {
    console.warn('Reranker API key not configured. Using initial ranking.');
    return candidates.slice(0, limit).map((candidate) => ({
      ...candidate,
      rerank_score: candidate.score,
    }));
  }

  try {
    const res = await fetch('https://api.openai.com/v1/rerank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RERANKER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini-rerank',
        query: _query,
        documents: candidates.map((candidate) => candidate.text),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Reranker API error:', res.status, text);
      return candidates.slice(0, limit).map((candidate) => ({
        ...candidate,
        rerank_score: candidate.score,
      }));
    }

    const json = await res.json();
    const ranked = json?.results?.map((result: { index: number; score: number }) => ({
      ...candidates[result.index],
      rerank_score: result.score,
    }));

    if (!Array.isArray(ranked)) {
      console.warn('Reranker API returned unexpected payload:', json);
      return candidates.slice(0, limit).map((candidate) => ({
        ...candidate,
        rerank_score: candidate.score,
      }));
    }

    return ranked.sort((a, b) => (b.rerank_score ?? 0) - (a.rerank_score ?? 0)).slice(0, limit);
  } catch (error) {
    console.error('Reranker API request failed:', error);
    return candidates.slice(0, limit).map((candidate) => ({
      ...candidate,
      rerank_score: candidate.score,
    }));
  }
}

function toResultPayload(candidate: RerankedCandidate) {
  const score = candidate.rerank_score ?? candidate.score ?? null;
  return {
    sentence: candidate.text,
    page: candidate.page_from === candidate.page_to ? candidate.page_from : candidate.page_from,
    doi: candidate.doi,
    section: candidate.section ?? null,
    document_id: candidate.document_id ?? null,
    score,
  };
}

