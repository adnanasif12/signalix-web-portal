import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client, authenticated with the SECRET service role
 * key. This key bypasses Row Level Security, so it must never reach the
 * browser — only import this file from pages/api/* (server code), never
 * from a component or a page that runs client-side.
 *
 * SUPABASE_SERVICE_ROLE_KEY is intentionally NOT prefixed with
 * NEXT_PUBLIC_, which is what keeps Next.js from bundling it into any
 * browser-facing JavaScript.
 */
export const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false },
      })
    : null;
