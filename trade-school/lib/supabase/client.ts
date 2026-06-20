// Supabase browser client
// Requires: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// Falls back gracefully if env vars are not set (app uses localStorage instead)

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return null — callers check for this and fall back to localStorage
    return null;
  }

  return createBrowserClient(url, key);
}

export const supabase = createClient();
