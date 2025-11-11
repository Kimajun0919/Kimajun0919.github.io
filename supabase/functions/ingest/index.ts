import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

// TODO: Replace with @supabase/supabase-js once environment variables are configured.
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL'); // TODO: Set Supabase URL in project settings.
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); // TODO: Provide service role key.
const EMBEDDING_API_KEY = Deno.env.get('EMBEDDING_API_KEY'); // TODO: Provide embedding model API key.

// Placeholder Supabase client. Configure once credentials are available.
// const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
//   auth: { persistSession: false },
// });

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase credentials are not configured.');
    return new Response('Server configuration error.', { status: 500 });
  }

  try {
    const formData = await req.formData();
    const files = getUploadedFiles(formData);

    if (files.length === 0) {
      return new Response('No PDF files provided.', { status: 400 });
    }

    for (const file of files) {
      await processPdfFile(file);
    }

    return Response.json({ status: 'ok' });
  } catch (error) {
    console.error('Ingest function error:', error);
    return new Response('Internal Server Error', { status: 500 });
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

async function persistToSupabase(_payload: {
  file: File;
  chunks: Chunk[];
  embeddings: number[][];
}) {
  // TODO: Insert document metadata into documents table.
  // TODO: Insert chunk records with vector embeddings into chunks table using pgvector.
  console.log('persistToSupabase placeholder invoked.');

  // Example structure:
  // const { data: document } = await supabase
  //   .from('documents')
  //   .insert({
  //     id: crypto.randomUUID(),
  //     title: payload.file.name,
  //     authors: null,
  //     year: null,
  //     doi: null,
  //     language: null,
  //     created_at: new Date().toISOString(),
  //   })
  //   .select()
  //   .single();
  //
  // await supabase.from('chunks').insert(
  //   payload.chunks.map((chunk, index) => ({
  //     id: chunk.id,
  //     document_id: document.id,
  //     text: chunk.text,
  //     page_from: chunk.pageFrom,
  //     page_to: chunk.pageTo,
  //     section: chunk.section,
  //     vector: payload.embeddings[index],
  //     caption_flag: false,
  //     created_at: new Date().toISOString(),
  //   })),
  // );
}

