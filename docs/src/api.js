(() => {
  const globalObj = typeof window !== 'undefined' ? window : globalThis;
  const baseUrl =
    globalObj.__SUPABASE_FUNCTIONS_URL__ ||
    (typeof process !== 'undefined' ? process.env?.SUPABASE_FUNCTIONS_URL : '') ||
    '';
  const anonKey =
    globalObj.__SUPABASE_ANON_KEY__ ||
    (typeof process !== 'undefined' ? process.env?.SUPABASE_ANON_KEY : '') ||
    '';

  function resolveUrl(path) {
    if (!baseUrl) {
      throw new Error('Supabase Functions URL is not configured.');
    }

    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const trimmedPath = path.replace(/^\//, '');
    return `${normalizedBase}${trimmedPath}`;
  }

  async function fetchSupabase(path, method = 'GET', body) {
    const url = resolveUrl(path);
    const headers = {};

    if (anonKey) {
      headers.Authorization = `Bearer ${anonKey}`;
      headers.apikey = anonKey;
    }

    const options = { method, headers };

    if (method.toUpperCase() === 'GET') {
      if (!anonKey) {
        delete options.headers;
      }
    } else if (body instanceof FormData) {
      options.body = body;
      if (!anonKey) {
        delete options.headers;
      }
    } else if (body !== undefined && body !== null) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
      if (!anonKey) {
        delete options.headers.apikey;
        delete options.headers.Authorization;
      }
    }

    const response = await fetch(url, options);
    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || `Supabase request failed (${response.status})`);
    }

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (_error) {
      return text;
    }
  }

  globalObj.fetchSupabase = fetchSupabase;
})();

