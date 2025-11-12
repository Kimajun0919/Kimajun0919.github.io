// @ts-ignore Supabase Edge Functions load Deno std modules at runtime.
import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

// @ts-ignore Supabase Edge Functions resolve this import at runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SB_URL'); // TODO: Set Supabase URL in project settings.
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SB_SERVICE_ROLE_KEY'); // TODO: Provide service role key.
const EMBEDDING_API_KEY = Deno.env.get('EMBEDDING_API_KEY'); // TODO: Provide embedding model API key.

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase credentials are not configured.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, Authorization, x-client-info, content-type',
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
    const formData = await req.formData();
    const files = getUploadedFiles(formData);

    console.log('Ingest function invoked. Files received:', files.map((file) => file.name));

    if (files.length === 0) {
      return new Response('No PDF files provided.', { status: 400 });
    }

    for (const file of files) {
      await processPdfFile(file);
    }

    return Response.json({ status: 'ok' }, { headers: corsHeaders });
  } catch (error) {
    console.error('Ingest function error:', error);
    return new Response('Internal Server Error', { status: 500, headers: corsHeaders });
  }
});

function getUploadedFiles(formData: FormData): File[] {
  const result: File[] = [];
  const singleFile = formData.get('file');
  if (singleFile instanceof File) {
    result.push(singleFile);
  }

  const fileList = formData.getAll('files');
  for (const entry of fileList) {
    if (entry instanceof File) {
      result.push(entry);
    }
  }

  return result;
}

async function processPdfFile(file: File) {
  console.log('Processing file:', file.name);

  // 1) PDF 텍스트 추출
  const pdfText = await extractTextFromPdf(file);

  // 2) 텍스트 → 청크 분할
  const chunks = await splitTextIntoChunks(pdfText);

  // 3) 임베딩 생성
  const embeddings = await generateEmbeddings(chunks);

  // 4) Supabase documents / chunks 테이블에 저장
  await persistToSupabase({
    file,
    chunks,
    embeddings,
  });
}

async function extractTextFromPdf(_file: File): Promise<string> {
  // TODO: Integrate pdf.js or pdf-parse (via Deno-compatible library) to extract pages and metadata.
  console.log('extractTextFromPdf placeholder invoked.');
  return 'PDF parsing placeholder text.';
}

type Chunk = {
  id: string;
  text: string;
  pageFrom: number | null;
  pageTo: number | null;
  section: string | null;
  metadata?: Record<string, unknown>;
};

async function splitTextIntoChunks(_text: string): Promise<Chunk[]> {
  // TODO: Implement robust chunking based on sections/paragraphs/pages.
  console.log('splitTextIntoChunks placeholder invoked.');
  return [
    {
      id: crypto.randomUUID(),
      text: 'Sample chunk text.',
      pageFrom: 1,
      pageTo: 1,
      section: 'Introduction',
    },
  ];
}

async function generateEmbeddings(chunks: Chunk[]): Promise<number[][]> {
  if (!EMBEDDING_API_KEY) {
    console.warn('Embedding API key is not configured. Returning zero vectors.');
  }

  // TODO: Call bge-m3 embedding API with chunk texts and return vectors.
  console.log('generateEmbeddings placeholder invoked.');
  return chunks.map(() => Array(1024).fill(0));
}

type PersistPayload = {
  file: File;
  chunks: Chunk[];
  embeddings: number[][];
};

async function persistToSupabase(payload: PersistPayload) {
  console.log('Persisting document to Supabase:', payload.file.name);

  const documentId = crypto.randomUUID();

  const { data: document, error: documentError } = await supabase
    .from('documents')
    .insert({
      id: documentId,
      title: payload.file.name,
      authors: null,
      year: null,
      doi: null,
      language: null,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (documentError || !document) {
    console.error('Failed to insert document:', documentError);
    throw new Error('Failed to insert document metadata.');
  }

  const chunkRows = payload.chunks.map((chunk, index) => ({
    id: chunk.id,
    document_id: document.id,
    text: chunk.text,
    page_from: chunk.pageFrom,
    page_to: chunk.pageTo,
    section: chunk.section,
    vector: payload.embeddings[index],
    caption_flag: false,
    created_at: new Date().toISOString(),
  }));

  const { error: chunkError } = await supabase.from('chunks').insert(chunkRows);

  if (chunkError) {
    console.error('Failed to insert chunks:', chunkError);
    throw new Error('Failed to insert chunk data.');
  }

  console.log('Document and chunks persisted successfully:', document.id);
}

