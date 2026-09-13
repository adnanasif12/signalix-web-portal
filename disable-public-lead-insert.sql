-- Run this ONCE in your existing Supabase project's SQL Editor.
--
-- Why: Leads used to be inserted directly from the browser using the
-- public anon key, so the "leads" table had a policy allowing anyone
-- (anon role) to INSERT. Now that submissions go through the app's own
-- /api/leads route (which uses the secret service_role key server-side),
-- that public policy is no longer needed — removing it means the anon
-- key can no longer be used to write to this table at all, even if
-- someone finds it in your site's JavaScript.

drop policy if exists "Public can insert leads" on leads;
