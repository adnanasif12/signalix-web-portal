import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Falls back to null when the env vars aren't set yet (e.g. local dev before
// Supabase is configured) so the site doesn't crash — callers should handle
// a null client by skipping the Supabase call gracefully.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
