-- Supabase 프로젝트를 초기화할 때 실행하는 스크립트입니다.
-- 테이블, 인덱스, 권한, RPC 함수까지 한 번에 정의합니다.

-- 1. Enable pgvector extension (필수)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Documents table (논문 메타데이터)
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  authors text,
  year text,
  doi text,
  language text,
  created_at timestamptz DEFAULT now()
);

-- 3. Chunks table (PDF 문단 단위 텍스트 + 벡터)
CREATE TABLE IF NOT EXISTS chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  text text NOT NULL,
  page_from int,
  page_to int,
  section text,
  -- 🔹 1536차원으로 확장 (OpenAI text-embedding-3-large, bge-m3 모델 대응)
  vector vector(1536),
  caption_flag boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 4. Indexes for RLS and vector search performance
CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_chunks_created_at ON chunks(created_at);

-- 🔹 벡터 검색 인덱스 (코사인 거리 기반)
-- ivfflat은 approximate index이므로 'ANALYZE' 후 적정 list 수 조정 가능
CREATE INDEX IF NOT EXISTS idx_chunks_vector_ivfflat
ON chunks USING ivfflat (vector vector_cosine_ops)
WITH (lists = 100);

-- 5. 권한 부여 (authenticated 사용자: 읽기만 허용)
GRANT SELECT ON documents TO authenticated;
GRANT SELECT ON chunks TO authenticated;

-- 6. Row-Level Security 설정
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated_can_select_documents" ON documents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "authenticated_can_select_chunks" ON chunks
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "no_public_insert_documents" ON documents
  FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "no_public_insert_chunks" ON chunks
  FOR INSERT TO authenticated WITH CHECK (false);

-- 7. Helper function (optional)
CREATE OR REPLACE FUNCTION public.count_chunks()
RETURNS bigint LANGUAGE sql STABLE AS $$
  SELECT count(*) FROM chunks;
$$;

-- 8. match_chunks RPC for semantic search
CREATE OR REPLACE FUNCTION public.match_chunks(
  query_embedding vector,
  match_threshold float DEFAULT 0.75,
  match_count integer DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  document_id uuid,
  text text,
  page_from int,
  page_to int,
  section text,
  doi text,
  score float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    c.id,
    c.document_id,
    c.text,
    c.page_from,
    c.page_to,
    c.section,
    d.doi,
    1 - (c.vector <=> query_embedding) AS score
  FROM chunks c
  JOIN documents d ON d.id = c.document_id
  WHERE c.vector <=> query_embedding <= (1 - match_threshold)
  ORDER BY c.vector <=> query_embedding
  LIMIT LEAST(match_count, 200);
$$;