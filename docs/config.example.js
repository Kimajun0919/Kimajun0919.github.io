/* 
 * 예시 구성 파일입니다.
 * 1) 이 파일을 docs/config.js로 복사한 뒤
 * 2) 아래 URL과 키를 본인 Supabase 프로젝트 값으로 교체하세요.
 */
(function configureSupabase() {
  const SUPABASE_FUNCTIONS_URL = 'https://your-project.supabase.co/functions/v1';
  const SUPABASE_ANON_KEY = 'supabase-anon-key';

  window.__SUPABASE_FUNCTIONS_URL__ = SUPABASE_FUNCTIONS_URL;
  window.__SUPABASE_ANON_KEY__ = SUPABASE_ANON_KEY;
})();

