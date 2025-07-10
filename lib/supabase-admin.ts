import { createClient } from "@supabase/supabase-js"

/**
 * Server-side (RSC / Server Action) Supabase client.
 *
 * 1.  Uses `SUPABASE_SERVICE_ROLE_KEY` when it exists – this bypasses RLS safely
 * 2.  Falls back to the public anon key so previews still work without the secret
 * 3.  Never ships credentials to the browser
 *
 * Usage:
 *   import { supabaseAdmin } from "@/lib/supabase-admin"
 *   const { data, error } = await supabaseAdmin.from("my_table").select()
 */
const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create once, reuse everywhere on the server
export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
    : null
