/**
 * Supabase Utility-Barrel
 * 
 * Zentrale Exports für einfache Imports:
 * 
 * ```tsx
 * // Server Component
 * import { createClient } from '@/lib/supabase'
 * 
 * // Client Component
 * import { supabase } from '@/lib/supabase'
 * ```
 */

// Server-Side
export { createClient, createAdminClient } from './server'

// Client-Side
export { supabase, createClient as createBrowserClient } from './client'

// Middleware
export { updateSession, getUser } from './middleware'

// Typen
export type { Database } from '@/types/database'
