/* Copy this file to docs/config.js and fill in your Supabase credentials. */
(function configureSupabase() {
  const SUPABASE_FUNCTIONS_URL = 'https://your-project.supabase.co/functions/v1';
  const SUPABASE_ANON_KEY = 'supabase-anon-key';

  window.__SUPABASE_FUNCTIONS_URL__ = SUPABASE_FUNCTIONS_URL;
  window.__SUPABASE_ANON_KEY__ = SUPABASE_ANON_KEY;
})();

