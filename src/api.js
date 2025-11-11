const SUPABASE_FUNCTIONS_BASE_URL =
  window.__SUPABASE_FUNCTIONS_URL__ ?? import.meta.env?.VITE_SUPABASE_FUNCTIONS_URL ?? '';

async function callSupabaseFunction(path, init = {}) {
  if (!SUPABASE_FUNCTIONS_BASE_URL) {
    throw new Error('Supabase Functions URL is not configured.');
  }

  const url = `${SUPABASE_FUNCTIONS_BASE_URL}/${path}`.replace(/\/{2,}/g, '/').replace(':/', '://');
  const response = await fetch(url, init);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Supabase function call failed.');
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('file', file);

  return callSupabaseFunction('ingest', {
    method: 'POST',
    body: formData,
  });
}

export async function searchDocuments(payload) {
  return callSupabaseFunction('search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

