import { createClient } from "@supabase/supabase-js"

/**
 * Server-side (RSC / Server Action) Supabase client.
 * Uses the available Supabase environment variables.
 */

// Get Supabase URL - try multiple possible env var names
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL

// Get Supabase key - prefer service role key, fallback to anon key
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error("Missing Supabase URL. Please set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseKey) {
  console.error(
    "Missing Supabase key. Please set SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY",
  )
}

// Create the Supabase client
export const supabaseAdmin =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null

// Debug logging (remove in production)
if (process.env.NODE_ENV === "development") {
  console.log("Supabase URL configured:", !!supabaseUrl)
  console.log("Supabase Key configured:", !!supabaseKey)
  console.log("Supabase Admin client created:", !!supabaseAdmin)
}
