// @ts-ignore Supabase Edge Functions load Deno std modules at runtime.
import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

// @ts-ignore Supabase Edge Functions resolve this import at runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
// @ts-ignore PDF.js is loaded through an ESM shim.
import pdfjsLib from 'https://esm.sh/pdfjs-dist@3.11.174/legacy/build/pdf.mjs';

const SUPABASE_URL = Deno.env.get('SB_URL'); // TODO: Set Supabase URL in project settings.
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SB_SERVICE_ROLE_KEY'); // TODO: Provide service role key.
const EMBEDDING_API_KEY = Deno.env.get('EMBEDDING_API_KEY'); // TODO: Provide embedding model API key.
const EMBEDDING_MODEL =
  Deno.env.get('EMBEDDING_MODEL') ?? Deno.env.get('OPENAI_EMBEDDING_MODEL') ?? 'text-embedding-3-small';
const EMBEDDING_DIMENSION = Number(Deno.env.get('EMBEDDING_DIMENSION') ?? '1536') || 1536;

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

if (pdfjsLib?.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://esm.sh/pdfjs-dist@3.11.174/build/pdf.worker.mjs';
}

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
  const pages = await extractTextFromPdf(file);

  // 2) 텍스트 → 청크 분할
  const chunks = await splitTextIntoChunks(pages);

  // 3) 임베딩 생성
  const embeddings = await generateEmbeddings(chunks);

  // 4) Supabase documents / chunks 테이블에 저장
  await persistToSupabase({
    file,
    chunks,
    embeddings,
  });
}

type PdfPageText = {
  pageNumber: number;
  text: string;
};

async function extractTextFromPdf(file: File): Promise<PdfPageText[]> {
  const buffer = await file.arrayBuffer();
  const typedArray = new Uint8Array(buffer);

  const loadingTask = pdfjsLib.getDocument({ data: typedArray });
  const pdf = await loadingTask.promise;

  try {
    const pages: PdfPageText[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const strings = textContent.items
        .map((item: unknown) => {
          if (typeof item === 'object' && item !== null && 'str' in item) {
            return String((item as { str?: string }).str ?? '');
          }
          return '';
        })
        .filter((value) => value.trim().length > 0);

      const text = strings.join(' ').replace(/\s+/g, ' ').trim();
      if (text.length > 0) {
        pages.push({ pageNumber, text });
      }
    }

    if (pages.length === 0) {
      console.warn('PDF parsing produced no text. Using filename as fallback chunk content.');
      return [{ pageNumber: 1, text: file.name }];
    }

    console.log(`PDF parsing completed. Extracted ${pages.length} page(s).`);
    return pages;
  } finally {
    await pdf.cleanup();
    await loadingTask.destroy();
  }
}

type Chunk = {
  id: string;
  text: string;
  pageFrom: number | null;
  pageTo: number | null;
  section: string | null;
  metadata?: Record<string, unknown>;
};

const DEFAULT_CHUNK_SIZE = Number(Deno.env.get('CHUNK_CHAR_LIMIT') ?? '800') || 800;

async function splitTextIntoChunks(pages: PdfPageText[]): Promise<Chunk[]> {
  const paragraphs = pages.flatMap((page) =>
    page.text
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0)
      .map((paragraph) => ({ pageNumber: page.pageNumber, paragraph })),
  );

  if (paragraphs.length === 0) {
    return [
      {
        id: crypto.randomUUID(),
        text: '추출된 텍스트가 없습니다.',
        pageFrom: null,
        pageTo: null,
        section: null,
      },
    ];
  }

  const chunks: Chunk[] = [];
  let currentText = '';
  let currentStartPage: number | null = null;
  let currentEndPage: number | null = null;

  const flushChunk = () => {
    const text = currentText.trim();
    if (!text) {
      currentText = '';
      currentStartPage = null;
      currentEndPage = null;
      return;
    }

    chunks.push({
      id: crypto.randomUUID(),
      text,
      pageFrom: currentStartPage,
      pageTo: currentEndPage,
      section: null,
    });

    currentText = '';
    currentStartPage = null;
    currentEndPage = null;
  };

  for (const { pageNumber, paragraph } of paragraphs) {
    if (!currentText) {
      currentText = paragraph;
      currentStartPage = pageNumber;
      currentEndPage = pageNumber;
      continue;
    }

    if (currentText.length + paragraph.length + 2 > DEFAULT_CHUNK_SIZE) {
      flushChunk();
      currentText = paragraph;
      currentStartPage = pageNumber;
      currentEndPage = pageNumber;
    } else {
      currentText = `${currentText}\n\n${paragraph}`;
      currentEndPage = pageNumber;
    }
  }

  if (currentText) {
    flushChunk();
  }

  console.log(`Chunk generation complete. Produced ${chunks.length} chunk(s).`);
  return chunks;
}

async function generateEmbeddings(chunks: Chunk[]): Promise<number[][]> {
  if (!EMBEDDING_API_KEY) {
    console.warn('Embedding API key is not configured. Returning zero vectors.');
    return chunks.map(() => new Array(EMBEDDING_DIMENSION).fill(0));
  }

  const fallbackVector = new Array(EMBEDDING_DIMENSION).fill(0);

  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${EMBEDDING_API_KEY}`,
      },
      body: JSON.stringify({
        model: EMBEDDING_MODEL,
        input: chunks.map((chunk) => chunk.text),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Embedding API error:', response.status, errorText);
      return chunks.map(() => [...fallbackVector]);
    }

    const json = await response.json();
    const vectors = Array.isArray(json?.data) ? json.data : [];

    return chunks.map((chunk, index) => {
      const embedding = vectors[index]?.embedding;
      if (!Array.isArray(embedding)) {
        console.warn('Embedding API returned unexpected payload for chunk index', index);
        return [...fallbackVector];
      }

      if (embedding.length === EMBEDDING_DIMENSION) {
        return embedding as number[];
      }

      if (embedding.length > EMBEDDING_DIMENSION) {
        console.warn(
          `Embedding dimension (${embedding.length}) exceeds target dimension (${EMBEDDING_DIMENSION}). Truncating.`,
        );
        return (embedding as number[]).slice(0, EMBEDDING_DIMENSION);
      }

      console.warn(
        `Embedding dimension (${embedding.length}) smaller than target dimension (${EMBEDDING_DIMENSION}). Padding with zeros.`,
      );
      const padded = embedding.slice();
      while (padded.length < EMBEDDING_DIMENSION) {
        padded.push(0);
      }
      return padded;
    });
  } catch (error) {
    console.error('Embedding API request failed:', error);
    return chunks.map(() => [...fallbackVector]);
  }
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

