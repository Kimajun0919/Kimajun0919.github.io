(() => {
  // 브라우저(window) 또는 Node(globalThis) 어느 환경에서도 동작하도록 안전하게 객체를 선택합니다.
  const globalObj = typeof window !== 'undefined' ? window : globalThis;
  // Supabase Edge Functions 기본 URL. config.js 또는 환경 변수에서 값을 가져옵니다.
  const baseUrl =
    globalObj.__SUPABASE_FUNCTIONS_URL__ ||
    (typeof process !== 'undefined' ? process.env?.SUPABASE_FUNCTIONS_URL : '') ||
    '';
  // 익명 키(anon key)는 요청 인증용 헤더에 실어 보냅니다.
  const anonKey =
    globalObj.__SUPABASE_ANON_KEY__ ||
    (typeof process !== 'undefined' ? process.env?.SUPABASE_ANON_KEY : '') ||
    '';

  // API 경로(`/search`, `/ingest` 등)를 절대경로로 변환합니다.
  function resolveUrl(path) {
    if (!baseUrl) {
      throw new Error('Supabase Functions URL is not configured.');
    }

    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const trimmedPath = path.replace(/^\//, '');
    return `${normalizedBase}${trimmedPath}`;
  }

  /**
   * Supabase Edge Function을 호출하는 공통 유틸 함수입니다.
   * - GET: 기본적으로 헤더를 비워 CORS 오류를 방지합니다.
   * - POST + JSON: JSON.stringify로 body를 직렬화합니다.
   * - POST + FormData: 파일 업로드 시 사용합니다.
   */
  async function fetchSupabase(path, method = 'GET', body) {
    const url = resolveUrl(path);
    const headers = {};

    if (anonKey) {
      headers.Authorization = `Bearer ${anonKey}`;
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

  // 전역(window)에 fetchSupabase 함수를 노출하여 다른 스크립트에서 재사용합니다.
  globalObj.fetchSupabase = fetchSupabase;
})();

