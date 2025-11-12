// 사용자 질문을 받아 벡터 검색과(선택적) 리랭킹을 수행하는 Edge Function입니다.
// @ts-ignore Supabase Edge Functions load Deno std modules at runtime.
import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

// @ts-ignore Supabase Edge Functions resolve this import at runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// 검색에 필요한 외부 서비스(Supabase, OpenAI) 정보를 환경 변수에서 읽습니다.
const SUPABASE_URL = Deno.env.get('SB_URL'); // TODO: Configure Supabase URL.
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SB_SERVICE_ROLE_KEY'); // TODO: Configure service key.
const EMBEDDING_API_KEY = Deno.env.get('EMBEDDING_API_KEY'); // TODO: Provide embedding API key.
const RERANKER_API_KEY = Deno.env.get('RERANKER_API_KEY'); // TODO: Provide reranker API key.
const EMBEDDING_MODEL =
  Deno.env.get('EMBEDDING_MODEL') ?? Deno.env.get('OPENAI_EMBEDDING_MODEL') ?? 'text-embedding-3-small';
const EMBEDDING_DIMENSION = Number(Deno.env.get('EMBEDDING_DIMENSION') ?? '1536') || 1536;
const MATCH_THRESHOLD = Number(Deno.env.get('MATCH_THRESHOLD') ?? '0.75') || 0.75;
const MATCH_COUNT = Number(Deno.env.get('MATCH_COUNT') ?? '20') || 20;
const RETURN_COUNT = Number(Deno.env.get('RETURN_COUNT') ?? '5') || 5;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase credentials are missing. Ensure SB_URL and SB_SERVICE_ROLE_KEY secrets are set.');
}
if (!EMBEDDING_API_KEY) {
  throw new Error('Embedding API key is missing. Set EMBEDDING_API_KEY in project secrets.');
}

// Supabase의 match_chunks RPC를 호출하기 위해 클라이언트를 초기화합니다.
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// 브라우저에서 fetch로 호출할 수 있게 CORS를 허용합니다.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, Authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// HTTP 엔드포인트: 질문을 JSON으로 받아 검색 결과를 JSON으로 돌려줍니다.
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
    const initialCandidates = await searchSimilarChunks(queryVector, MATCH_COUNT);

    if (initialCandidates.length === 0) {
      return Response.json({ results: [] }, { headers: corsHeaders });
    }

    // 3) 리랭킹 (top 50 → top 10)
    const rerankedCandidates = await rerankCandidates(query, initialCandidates, Math.max(RETURN_COUNT, 5));

    // 4) 상위 5개 결과 준비
    const topResults = rerankedCandidates.slice(0, RETURN_COUNT).map(toResultPayload);

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

// 사용자의 자연어 질문을 임베딩 벡터로 변환합니다.
async function generateQueryEmbedding(query: string): Promise<number[]> {
  try {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${EMBEDDING_API_KEY}`,
      },
      body: JSON.stringify({
        model: EMBEDDING_MODEL,
        input: query,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Embedding API error:', res.status, text);
      throw new Error('Embedding API call failed.');
    }

    const json = await res.json();
    const embedding = json?.data?.[0]?.embedding;

    if (!Array.isArray(embedding)) {
      console.error('Embedding API returned unexpected payload:', json);
      throw new Error('Embedding API returned unexpected payload.');
    }

    return embedding as number[];
  } catch (error) {
    console.error('Embedding API request failed:', error);
    throw error instanceof Error ? error : new Error('Embedding API request failed.');
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

// Supabase에 정의된 match_chunks RPC를 호출해 벡터 유사도 기반으로 후보를 찾습니다.
async function searchSimilarChunks(queryVector: number[], limit: number): Promise<ChunkRecord[]> {
  try {
    const { data, error } = await supabase.rpc('match_chunks', {
      query_embedding: queryVector,
      match_threshold: MATCH_THRESHOLD,
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

// (선택) OpenAI Rerank API를 사용해 더 높은 품질의 정렬을 수행합니다.
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

// 프런트엔드에서 바로 사용할 수 있는 형태로 후보 데이터를 가공합니다.
function toResultPayload(candidate: RerankedCandidate) {
  const score = candidate.rerank_score ?? candidate.score ?? null;
  const pageFrom = candidate.page_from ?? null;
  const pageTo = candidate.page_to ?? null;
  let page: string | number | null = null;

  if (pageFrom !== null && pageTo !== null) {
    page = pageFrom === pageTo ? pageFrom : `${pageFrom}-${pageTo}`;
  } else if (pageFrom !== null || pageTo !== null) {
    page = pageFrom ?? pageTo;
  }

  return {
    sentence: candidate.text,
    page,
    page_from: pageFrom,
    page_to: pageTo,
    doi: candidate.doi,
    section: candidate.section ?? null,
    document_id: candidate.document_id ?? null,
    score,
  };
}

