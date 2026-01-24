/**
 * NeXifyAI Project Configuration Types
 * =====================================
 *
 * TypeScript-Definitionen für project.config.ts
 * Bietet vollständiges Autocomplete und Validierung.
 */

// ============================================================
// PROJEKT
// ============================================================

export interface ProjectInfo {
  name: string
  slug: string
  description: string
  version: string
  contact: {
    company: string
    email: string
    website: string
  }
}

// ============================================================
// FEATURES
// ============================================================

export interface AuthFeature {
  enabled: boolean
  providers: Array<'email' | 'google' | 'github' | 'apple' | 'microsoft'>
  mfa: boolean
  passwordless: boolean
}

export interface MultiTenantFeature {
  enabled: boolean
  isolation: 'row' | 'schema' | 'database'
}

export interface I18nFeature {
  enabled: boolean
  defaultLocale: string
  locales: string[]
}

export interface AnalyticsFeature {
  enabled: boolean
  provider: 'plausible' | 'umami' | 'posthog' | 'none'
  siteId?: string
}

export interface EmailFeature {
  enabled: boolean
  provider: 'resend' | 'postmark' | 'sendgrid'
}

export interface PaymentsFeature {
  enabled: boolean
  provider: 'stripe' | 'lemonsqueezy'
  mode: 'subscription' | 'onetime' | 'both'
}

export interface StorageFeature {
  enabled: boolean
  provider: 'supabase' | 's3'
  maxFileSize: number
  allowedTypes?: string[]
}

export interface RealtimeFeature {
  enabled: boolean
  channels: Array<'notifications' | 'chat' | 'presence' | 'sync'>
}

export interface Features {
  auth: AuthFeature
  multiTenant: MultiTenantFeature
  i18n: I18nFeature
  analytics: AnalyticsFeature
  email: EmailFeature
  payments: PaymentsFeature
  storage: StorageFeature
  realtime: RealtimeFeature
}

// ============================================================
// THEME
// ============================================================

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  destructive: string
  success: string
  warning: string
}

export interface ThemeFonts {
  sans: string
  mono: string
}

export interface DarkMode {
  enabled: boolean
  default: 'light' | 'dark' | 'system'
}

export interface Theme {
  colors: ThemeColors
  fonts: ThemeFonts
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full'
  darkMode: DarkMode
}

// ============================================================
// DATABASE
// ============================================================

export interface DatabaseSchemas {
  users: boolean
  multiTenant: boolean
  ecommerce: boolean
  cms: boolean
  crm: boolean
}

export interface CustomColumn {
  name: string
  type: 'text' | 'integer' | 'boolean' | 'timestamp' | 'uuid' | 'jsonb' | 'numeric'
  required?: boolean
  default?: unknown
  unique?: boolean
  references?: {
    table: string
    column: string
  }
}

export interface CustomTable {
  name: string
  columns: CustomColumn[]
  rls: boolean
  belongsTo: 'user' | 'company' | null
  timestamps?: boolean
  softDelete?: boolean
}

export interface Database {
  schemas: DatabaseSchemas
  customTables: CustomTable[]
}

// ============================================================
// API
// ============================================================

export interface RateLimit {
  enabled: boolean
  requests: number
  window: number
}

export interface Cors {
  origins: string[]
}

export interface ApiRoutes {
  health: boolean
  webhook: boolean
}

export interface Api {
  rateLimit: RateLimit
  cors: Cors
  routes: ApiRoutes
}

// ============================================================
// DEPLOYMENT
// ============================================================

export interface Environment {
  supabaseUrl: string
  supabaseAnonKey: string
  [key: string]: string
}

export interface CronJob {
  path: string
  schedule: string
}

export interface Deployment {
  platform: 'vercel' | 'netlify' | 'cloudflare'
  environments: {
    preview: Environment
    production: Environment
  }
  cron: CronJob[]
}

// ============================================================
// SEO
// ============================================================

export interface OpenGraph {
  type: 'website' | 'article' | 'product'
  siteName: string
  images: string[]
}

export interface Twitter {
  card: 'summary' | 'summary_large_image'
  site?: string
  creator?: string
}

export interface Seo {
  titleTemplate: string
  defaultTitle: string
  defaultDescription: string
  openGraph: OpenGraph
  twitter: Twitter
}

// ============================================================
// LEGAL
// ============================================================

export interface Gdpr {
  enabled: boolean
  cookieBanner: boolean
  privacyPolicy: string
  imprint: string
}

export interface Legal {
  gdpr: Gdpr
  termsOfService: string
}

// ============================================================
// MAIN CONFIG
// ============================================================

export interface ProjectConfig {
  project: ProjectInfo
  features: Features
  theme: Theme
  database: Database
  api: Api
  deployment: Deployment
  seo: Seo
  legal: Legal
}
