# NeXifyAI Starter-Kit

> **Config-First Architecture** für professionelle Web-Projekte mit Next.js, Supabase & Vercel.

## 🚀 Quick Start

```bash
# 1. Repository klonen
git clone <your-repo-url>
cd nexify-starter-kit

# 2. Dependencies installieren
pnpm install

# 3. Environment-Variablen konfigurieren
cp .env.example .env.local
# → .env.local mit Supabase-Credentials füllen

# 4. Supabase starten (lokal)
supabase start

# 5. Datenbank migrieren
supabase db push

# 6. Development-Server starten
pnpm dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

---

## 📁 Projekt-Struktur

```
nexify-starter-kit/
├── project.config.ts          # 🎯 ZENTRALE KONFIGURATION
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root Layout
│   │   └── page.tsx           # Landing Page
│   ├── components/            # React Components
│   │   ├── ui/                # shadcn/ui Basis-Komponenten
│   │   └── providers.tsx      # Client Providers
│   ├── config/                # Config Loader
│   │   ├── index.ts           # Helper Functions
│   │   └── types.ts           # TypeScript Types
│   ├── lib/                   # Utilities
│   │   ├── supabase/          # Supabase Clients
│   │   └── utils.ts           # Helper Functions
│   ├── styles/                # Global Styles
│   └── types/                 # TypeScript Types
│       └── database.ts        # Supabase DB Types
├── supabase/
│   ├── migrations/            # SQL Migrations
│   ├── config.toml            # Supabase CLI Config
│   └── seed.sql               # Test-Daten
├── .github/
│   └── copilot-instructions.md # AI Context
└── ...
```

---

## 🎯 Config-First Prinzip

**Die zentrale Idee:** Statt Code zu schreiben, konfigurierst du.

### `project.config.ts`

Diese Datei ist die **Single Source of Truth** für dein Projekt:

```typescript
export const projectConfig = {
  app: {
    name: 'Mein Projekt',
    url: 'https://meinprojekt.de',
  },
  features: {
    auth: true,           // Auth aktivieren
    multiTenant: true,    // Mandantenfähigkeit
    ecommerce: false,     // Shop-System
    i18n: false,          // Mehrsprachigkeit
    // ...
  },
  theme: {
    colors: {
      primary: '#3B82F6',
      // ...
    },
  },
  // ...
}
```

### Feature-Toggles nutzen

```tsx
import { isFeatureEnabled } from '@/config'

// In Komponenten:
{isFeatureEnabled('multiTenant') && <TenantSelector />}

// In Server Actions:
if (!isFeatureEnabled('ecommerce')) {
  throw new Error('E-Commerce ist nicht aktiviert')
}
```

---

## 🗄️ Datenbank

### Migrations

```
supabase/migrations/
├── 00001_users.sql         # Immer: Profiles, Settings
├── 00002_multi_tenant.sql  # Wenn multiTenant: true
└── 00003_ecommerce.sql     # Wenn ecommerce: true
```

### Typen generieren

```bash
# Nach Schema-Änderungen:
pnpm db:generate
# → src/types/database.ts wird aktualisiert
```

### Supabase CLI

```bash
# Lokal starten
supabase start

# Status prüfen
supabase status

# Migrations pushen
supabase db push

# Studio öffnen (Web-UI)
supabase studio
```

---

## 🔐 Sicherheit

### Row-Level Security (RLS)

Alle Tabellen haben RLS aktiviert. User sehen nur ihre Daten.

### Multi-Tenant Pattern

```typescript
// ❌ FALSCH - company_id aus Client
const { company_id } = request.body

// ✅ RICHTIG - company_id aus Session
const supabase = await createClient()
const { data: profile } = await supabase
  .from('profiles')
  .select('current_company_id')
  .single()
const company_id = profile?.current_company_id
```

---

## 🧪 Testing

```bash
# Unit Tests
pnpm test

# Test UI
pnpm test:ui

# E2E Tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

---

## 🚀 Deployment

### Vercel (empfohlen)

1. Repository mit Vercel verbinden
2. Environment Variables setzen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy!

### Supabase Production

1. Neues Supabase-Projekt erstellen
2. SQL Migrations ausführen
3. API-Keys in Vercel eintragen

---

## 📖 Dokumentation

Ausführliche Dokumentation in:

- `.github/UNIFIED_RULES.md` – Coding-Standards & Best Practices
- `.github/UNIFIED_WORKFLOWS.md` – CI/CD & Automatisierung
- `.github/UNIFIED_SKILLS.md` – Kompetenzen & Arbeitsweisen

---

## 🛠️ Scripts

| Script | Beschreibung |
|--------|-------------|
| `pnpm dev` | Development Server (Turbopack) |
| `pnpm build` | Production Build |
| `pnpm lint` | ESLint prüfen |
| `pnpm type-check` | TypeScript prüfen |
| `pnpm quality:check` | Lint + Type-Check + Build |
| `pnpm db:generate` | Supabase Types generieren |
| `pnpm db:studio` | Supabase Studio öffnen |

---

## 📝 Lizenz

MIT License – Frei für kommerzielle und private Nutzung.

---

**Built with ❤️ by NeXifyAI**
