import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser-side Supabase client for use in client components.
 * Uses the public anon key — RLS enforces row-level access.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
