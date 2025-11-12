/**
 * Supabase configuration placeholder.
 *
 * Copy docs/config.example.js to docs/config.js and fill in your actual
 * Supabase credentials before deploying. This placeholder keeps the build
 * working while reminding you to provide real values.
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

