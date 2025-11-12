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
