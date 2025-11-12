// @ts-ignore Supabase Edge Functions load Deno std modules at runtime.
import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

// @ts-ignore Supabase Edge Functions resolve this import at runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

const SUPABASE_URL = Deno.env.get('SB_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SB_SERVICE_ROLE_KEY');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase credentials are not configured.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, Authorization, x-client-info, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const documents = await listDocuments();
    return Response.json({ documents }, { headers: corsHeaders });
  } catch (error) {
    console.error('List documents error:', error);
    return new Response('Internal Server Error', { status: 500, headers: corsHeaders });
  }
});

type DocumentRow = {
  id: string;
  title: string | null;
  authors: string | null;
  year: string | null;
  doi: string | null;
  language: string | null;
  created_at: string | null;
  chunks?: Array<{ count?: number }>;
};

type DocumentSummary = {
  id: string;
  title: string;
  authors: string | null;
  year: string | null;
  doi: string | null;
  language: string | null;
  created_at: string | null;
  chunk_count: number;
};

async function listDocuments(): Promise<DocumentSummary[]> {
  const { data, error } = await supabase
    .from('documents')
    .select(
      `
        id,
        title,
        authors,
        year,
        doi,
        language,
        created_at,
        chunks(count)
      `,
    )
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Failed to load documents:', error);
    throw error;
  }

  const documents = Array.isArray(data) ? (data as DocumentRow[]) : [];

  return documents.map((doc) => {
    const chunkCount = Array.isArray(doc.chunks)
      ? doc.chunks.reduce((total, entry) => total + (entry?.count ?? 0), 0)
      : 0;

    return {
      id: doc.id,
      title: doc.title ?? '제목 없음',
      authors: doc.authors,
      year: doc.year,
      doi: doc.doi,
      language: doc.language,
      created_at: doc.created_at,
      chunk_count: chunkCount,
    };
  });
}

