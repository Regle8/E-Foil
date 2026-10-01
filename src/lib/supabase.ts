import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Env names differ between local (.env.local from the launcher) and Vercel (framework-prefixed), so accept both.
const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const schema = process.env.SUPABASE_PROJECT_SCHEMA ?? process.env.SUPABASE_SCHEMA ?? "e_foil";

let client: SupabaseClient<any, string> | null = null; // eslint-disable-line @typescript-eslint/no-explicit-any

/** Server-side Supabase client scoped to the e_foil schema, or null when env vars are missing. */
export function getSupabase() {
  if (!url || !anonKey) return null;
  client ??= createClient<any, string>(url, anonKey, { // eslint-disable-line @typescript-eslint/no-explicit-any
    db: { schema },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
