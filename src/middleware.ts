import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * ============================================================
 * Middleware
 * ============================================================
 *
 * Zentrale Middleware für:
 * - Multi-Site Routing (OpenCarBox vs Carvantooo)
 * - Session-Management (Supabase Auth)
 * - Route-Protection (optional)
 * - Locale-Detection (optional)
 *
 * ============================================================
 */

/**
 * Bestimmt den aktiven Brand basierend auf der Route
 */
function getBrandFromPath(pathname: string): 'carvantooo' | 'opencarbox' {
  // Shop-Routen → Carvantooo
  if (pathname.startsWith('/shop')) {
    return 'carvantooo'
  }

  // Werkstatt-Routen → OpenCarBox
  if (pathname.startsWith('/werkstatt')) {
    return 'opencarbox'
  }

  // Autohandel-Routen → OpenCarBox
  if (pathname.startsWith('/fahrzeuge')) {
    return 'opencarbox'
  }

  // Default: OpenCarBox (Hauptmarke)
  return 'opencarbox'
}

export async function middleware(request: NextRequest) {
  // 1. Supabase Session refreshen
  const response = await updateSession(request)

  // 2. Brand-Header für Client-Side Theme Switching hinzufügen
  const brand = getBrandFromPath(request.nextUrl.pathname)

  // Clone Response um Headers zu modifizieren
  const newResponse = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  })

  // Brand-Info als Header hinzufügen
  newResponse.headers.set('x-brand', brand)

  // Session-Daten von Supabase beibehalten
  if (response.headers) {
    response.headers.forEach((value, key) => {
      newResponse.headers.set(key, value)
    })
  }

  return newResponse
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
