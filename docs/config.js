/**
 * Supabase configuration placeholder.
 *
 * 사용 방법:
 * 1) docs/config.example.js 파일을 복사해 이 파일을 작성합니다.
 * 2) window.__SUPABASE_FUNCTIONS_URL__ 과 window.__SUPABASE_ANON_KEY__ 에
 *    실제 프로젝트 값을 할당합니다.
 *
 * 현재 파일은 값이 비어 있는 경우 콘솔 경고만 띄워 개발자가 채우도록 돕습니다.
 */
(function verifySupabaseConfig() {
  if (!window.__SUPABASE_FUNCTIONS_URL__) {
    console.warn(
      'Supabase Functions URL is not configured. Copy docs/config.example.js to docs/config.js and update it with your project values.',
    );
  }
  if (!window.__SUPABASE_ANON_KEY__) {
    console.warn(
      'Supabase anon key is not configured. Copy docs/config.example.js to docs/config.js and update it with your project values.',
    );
  }
})();

