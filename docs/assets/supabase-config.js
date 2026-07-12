/**
 * LUNGA — Supabase Configuration
 * 
 * After creating your free Supabase project:
 * 1. Go to Project Settings → API
 * 2. Copy the Project URL and anon public key
 * 3. Paste them below
 * 4. Replace the <YOUR_...> placeholders
 */

// Your Supabase project credentials (from Settings → API)
const SUPABASE_URL = 'https://YOUR-PROJECT-ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY';

// Load Supabase JS client from CDN (lightweight, ~50KB)
// Documentation: https://supabase.com/docs/reference/javascript
const SUPABASE_SCRIPT = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// Dynamically load Supabase
function loadSupabase() {
  return new Promise((resolve, reject) => {
    if (window.supabase) {
      resolve(window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
      return;
    }
    const script = document.createElement('script');
    script.src = SUPABASE_SCRIPT;
    script.onload = () => {
      window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      resolve(window.supabaseClient);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Export
window.LungaSupabase = { SUPABASE_URL, SUPABASE_ANON_KEY, loadSupabase };
