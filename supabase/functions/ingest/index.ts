import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return new Response('Missing PDF file', { status: 400 });
    }

    // TODO: Parse the PDF, generate embeddings, and persist to Supabase.
    console.log('Received file for ingest:', file.name, file.type, file.size);

    return Response.json({
      message: 'Ingest function placeholder. Implement PDF processing here.',
    });
  } catch (error) {
    console.error('Ingest function error', error);
    return new Response('Internal Server Error', { status: 500 });
  }
});

