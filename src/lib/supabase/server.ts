import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

/**
 * Supabase Client für Server-Components & Server-Actions
 *
 * Verwendung in Server Components:
 * ```tsx
 * import { createClient } from '@/lib/supabase/server'
 *
 * export default async function Page() {
 *   const supabase = await createClient()
 *   const { data } = await supabase.from('products').select()
 *   return <div>{data?.length} Produkte</div>
 * }
 * ```
 *
 * Verwendung in Server Actions:
 * ```tsx
 * 'use server'
 * import { createClient } from '@/lib/supabase/server'
 *
 * export async function getProducts() {
 *   const supabase = await createClient()
 *   return supabase.from('products').select()
 * }
 * ```
 */

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll wird aus Server Component aufgerufen
            // Kann ignoriert werden wenn Middleware Session refreshed
          }
        },
      },
    }
  )
}

/**
 * Admin Client (bypassed RLS!)
 *
 * ⚠️ ACHTUNG: Nur für interne Server-Tasks verwenden!
 * Dieser Client umgeht Row-Level-Security.
 *
 * Verwendung:
 * ```tsx
 * import { createAdminClient } from '@/lib/supabase/server'
 *
 * const admin = createAdminClient()
 * // Hat Zugriff auf ALLE Daten
 * ```
 */
export function createAdminClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {},
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

// Re-export für Typen
export type { Database } from '@/types/database'
