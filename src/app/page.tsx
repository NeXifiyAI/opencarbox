import Link from 'next/link'
import { config, isFeatureEnabled } from '@/config'

/**
 * ============================================================
 * Landing Page
 * ============================================================
 * 
 * Einfache Landing Page als Startpunkt.
 * Features werden basierend auf config aktiviert/deaktiviert.
 * 
 * ============================================================
 */

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">{config.app.name}</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            {isFeatureEnabled('auth') && (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                  Registrieren
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Badge */}
            <div className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
              🚀 {config.app.name} Starter-Kit
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Willkommen bei{' '}
              <span className="text-primary">{config.app.name}</span>
            </h1>
            
            {/* Subheadline */}
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              {config.seo.defaultDescription}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={isFeatureEnabled('auth') ? '/auth/register' : '/dashboard'}
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                Jetzt starten
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-16 max-w-5xl">
            {/* Feature 1 */}
            <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card">
              <div className="text-2xl">⚡</div>
              <h3 className="text-lg font-semibold">Blitzschnell</h3>
              <p className="text-sm text-muted-foreground">
                Next.js 15 mit App Router, Server Components und Streaming für maximale Performance.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card">
              <div className="text-2xl">🔒</div>
              <h3 className="text-lg font-semibold">Sicher</h3>
              <p className="text-sm text-muted-foreground">
                Supabase Auth mit Row-Level-Security. Deine Daten sind immer geschützt.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card">
              <div className="text-2xl">🎨</div>
              <h3 className="text-lg font-semibold">Anpassbar</h3>
              <p className="text-sm text-muted-foreground">
                Tailwind CSS mit shadcn/ui. Komplett konfigurierbar über project.config.ts.
              </p>
            </div>
            
            {/* Feature 4 - Multi-Tenant */}
            {isFeatureEnabled('multiTenant') && (
              <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card">
                <div className="text-2xl">🏢</div>
                <h3 className="text-lg font-semibold">Multi-Tenant</h3>
                <p className="text-sm text-muted-foreground">
                  Mandantenfähige Architektur mit isolierten Daten pro Organisation.
                </p>
              </div>
            )}
            
            {/* Feature 5 - E-Commerce */}
            {isFeatureEnabled('ecommerce') && (
              <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card">
                <div className="text-2xl">🛒</div>
                <h3 className="text-lg font-semibold">E-Commerce</h3>
                <p className="text-sm text-muted-foreground">
                  Komplettes Shop-System mit Produkten, Warenkorb und Bestellungen.
                </p>
              </div>
            )}
            
            {/* Feature 6 - i18n */}
            {isFeatureEnabled('i18n') && (
              <div className="flex flex-col gap-2 p-6 rounded-lg border bg-card">
                <div className="text-2xl">🌍</div>
                <h3 className="text-lg font-semibold">Mehrsprachig</h3>
                <p className="text-sm text-muted-foreground">
                  Internationalisierung out-of-the-box mit next-intl.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {config.app.name}. Alle Rechte vorbehalten.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            {isFeatureEnabled('legal') && (
              <>
                <Link href="/impressum" className="hover:text-primary transition-colors">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="hover:text-primary transition-colors">
                  Datenschutz
                </Link>
                <Link href="/agb" className="hover:text-primary transition-colors">
                  AGB
                </Link>
              </>
            )}
          </nav>
        </div>
      </footer>
    </div>
  )
}
