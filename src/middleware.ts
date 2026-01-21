import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest } from 'next/server'

/**
 * ============================================================
 * Middleware
 * ============================================================
 * 
 * Zentrale Middleware für:
 * - Session-Management (Supabase Auth)
 * - Route-Protection (optional)
 * - Locale-Detection (optional)
 * 
 * ============================================================
 */

export async function middleware(request: NextRequest) {
  // Supabase Session refreshen
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match alle Requests außer:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
