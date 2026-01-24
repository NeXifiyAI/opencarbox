import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

/**
 * Supabase Client für Browser/Client-Components
 *
 * Verwendung:
 * ```tsx
 * 'use client'
 * import { supabase } from '@/lib/supabase/client'
 *
 * const { data } = await supabase.from('products').select()
 * ```
 */

let client: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  if (client) return client

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

// Singleton-Export für einfache Nutzung
export const supabase = createClient()

// Re-export für Typen
export type { Database } from '@/types/database'
