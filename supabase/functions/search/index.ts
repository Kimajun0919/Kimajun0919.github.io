import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

// TODO: Replace with @supabase/supabase-js once environment variables are configured.
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL'); // TODO: Configure Supabase URL.
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); // TODO: Configure service key.
const EMBEDDING_API_KEY = Deno.env.get('EMBEDDING_API_KEY'); // TODO: Provide embedding API key.
const RERANKER_API_KEY = Deno.env.get('RERANKER_API_KEY'); // TODO: Provide reranker API key.

// Placeholder Supabase client setup.
// const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
//   auth: { persistSession: false },
// });

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase credentials are missing.');
    return new Response('Server configuration error.', { status: 500 });
  }

  try {
    const { query } = await req.json();

    if (typeof query !== 'string' || query.trim().length === 0) {
      return new Response('Query is required.', { status: 400 });
    }

    // 1) Query embedding 생성
    const queryVector = await generateQueryEmbedding(query);

    // 2) pgvector에서 top 50 검색
    const initialCandidates = await searchSimilarChunks(queryVector, 50);

    if (initialCandidates.length === 0) {
      return Response.json({ results: [] });
    }

    // 3) 리랭킹 (top 50 → top 10)
    const rerankedCandidates = await rerankCandidates(query, initialCandidates, 10);

    // 4) 상위 5개 결과 준비
    const topResults = rerankedCandidates.slice(0, 5).map(toResultPayload);

    return Response.json({
      results: topResults,
    });
  } catch (error) {
    console.error('Search function error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});

async function generateQueryEmbedding(_query: string): Promise<number[]> {
  if (!EMBEDDING_API_KEY) {
    console.warn('Embedding API key not configured. Returning zero vector.');
  }

  // TODO: Call bge-m3 embedding service and return the embedding vector.
  console.log('generateQueryEmbedding placeholder invoked.');
  return Array(1024).fill(0);
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

async function searchSimilarChunks(_queryVector: number[], limit: number): Promise<ChunkRecord[]> {
  // TODO: Use Supabase RPC or REST query to perform vector similarity search against chunks.vector.
  console.log('searchSimilarChunks placeholder invoked.');
  return Array.from({ length: limit }, (_, index) => ({
    id: crypto.randomUUID(),
    document_id: crypto.randomUUID(),
    text: `Placeholder chunk text ${index + 1}`,
    page_from: 1,
    page_to: 1,
    section: 'Placeholder section',
    doi: `10.0000/placeholder${index + 1}`,
    score: 1 - index * 0.01,
  }));
}

type RerankedCandidate = ChunkRecord & { rerank_score: number };

async function rerankCandidates(
  _query: string,
  candidates: ChunkRecord[],
  limit: number,
): Promise<RerankedCandidate[]> {
  if (!RERANKER_API_KEY) {
    console.warn('Reranker API key not configured. Using initial ranking.');
  }

  // TODO: Call bge-reranker-v2 API to score candidates and return top results.
  console.log('rerankCandidates placeholder invoked.');

  const reranked = candidates
    .map((candidate, index) => ({
      ...candidate,
      rerank_score: candidate.score - index * 0.001,
    }))
    .sort((a, b) => b.rerank_score - a.rerank_score);

  return reranked.slice(0, limit);
}

function toResultPayload(candidate: RerankedCandidate) {
  return {
    sentence: candidate.text,
    page: candidate.page_from === candidate.page_to ? candidate.page_from : candidate.page_from,
    doi: candidate.doi,
    score: candidate.rerank_score,
  };
}

