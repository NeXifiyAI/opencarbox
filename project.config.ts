/**
 * NeXifyAI Project Configuration
 * ================================
 *
 * Diese Datei ist die EINZIGE Stelle, die du anpassen musst.
 * Alle Module lesen diese Config und konfigurieren sich selbst.
 *
 * Nach Änderungen: `pnpm generate` ausführen
 */

import type { ProjectConfig } from './src/config/types'

const config: ProjectConfig = {
  // ============================================================
  // PROJEKT-INFORMATIONEN
  // ============================================================

  project: {
    name: 'Mein Projekt',
    slug: 'mein-projekt',
    description: 'Projektbeschreibung',
    version: '1.0.0',

    contact: {
      company: 'Firmenname',
      email: 'kontakt@example.com',
      website: 'https://example.com',
    },
  },

  // ============================================================
  // FEATURES (An/Aus)
  // ============================================================

  features: {
    auth: {
      enabled: true,
      providers: ['email'],
      mfa: false,
      passwordless: false,
    },

    multiTenant: {
      enabled: false,
      isolation: 'row',
    },

    i18n: {
      enabled: false,
      defaultLocale: 'de',
      locales: ['de', 'en'],
    },

    analytics: {
      enabled: false,
      provider: 'plausible',
    },

    email: {
      enabled: true,
      provider: 'resend',
    },

    payments: {
      enabled: false,
      provider: 'stripe',
      mode: 'subscription',
    },

    storage: {
      enabled: false,
      provider: 'supabase',
      maxFileSize: 10,
    },

    realtime: {
      enabled: false,
      channels: [],
    },
  },

  // ============================================================
  // DESIGN SYSTEM
  // ============================================================

  theme: {
    colors: {
      primary: '#343f60',
      secondary: '#64748b',
      accent: '#3b82f6',
      destructive: '#ef4444',
      success: '#22c55e',
      warning: '#f59e0b',
    },

    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },

    borderRadius: 'md',

    darkMode: {
      enabled: true,
      default: 'system',
    },
  },

  // ============================================================
  // DATENBANK-SCHEMA (Supabase)
  // ============================================================

  database: {
    schemas: {
      users: true,
      multiTenant: false,
      ecommerce: false,
      cms: false,
      crm: false,
    },

    customTables: [],
  },

  // ============================================================
  // API-KONFIGURATION
  // ============================================================

  api: {
    rateLimit: {
      enabled: true,
      requests: 100,
      window: 60,
    },

    cors: {
      origins: ['*'],
    },

    routes: {
      health: true,
      webhook: false,
    },
  },

  // ============================================================
  // DEPLOYMENT (Vercel)
  // ============================================================

  deployment: {
    platform: 'vercel',

    environments: {
      preview: {
        supabaseUrl: 'NEXT_PUBLIC_SUPABASE_URL',
        supabaseAnonKey: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      },
      production: {
        supabaseUrl: 'NEXT_PUBLIC_SUPABASE_URL',
        supabaseAnonKey: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      },
    },

    cron: [],
  },

  // ============================================================
  // SEO & META
  // ============================================================

  seo: {
    titleTemplate: '%s | Mein Projekt',
    defaultTitle: 'Mein Projekt',
    defaultDescription: 'Projektbeschreibung für SEO',

    openGraph: {
      type: 'website',
      siteName: 'Mein Projekt',
      images: ['/og-image.png'],
    },

    twitter: {
      card: 'summary_large_image',
    },
  },

  // ============================================================
  // LEGAL & COMPLIANCE
  // ============================================================

  legal: {
    gdpr: {
      enabled: true,
      cookieBanner: true,
      privacyPolicy: '/datenschutz',
      imprint: '/impressum',
    },

    termsOfService: '/agb',
  },
}

export default config
