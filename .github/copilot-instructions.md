---
applyTo: '**'
---

# OpenCarBox & Carvantooo – AI-Anweisungen

## Architektur-Überblick

**Multi-Site-Plattform** mit zwei Marken auf einer Codebasis:

- **OpenCarBox** (Blau): Werkstatt + Autohandel → `/werkstatt/*`, `/fahrzeuge/*`
- **Carvantooo** (Rot): Online-Shop → `/shop/*`

Brand wird per Middleware in [src/middleware.ts](../src/middleware.ts) aus dem URL-Pfad erkannt und als Header übergeben.

## Tech-Stack

- Next.js 15+ (App Router, Turbopack) • Supabase (PostgreSQL + Auth) • Prisma ORM
- Tailwind + shadcn/ui • Zustand (Client State) • TanStack Query (Server State)

## Config-First Prinzip

**`project.config.ts` ist Single Source of Truth** – Features, Theme, SEO, DB-Schemas:

```typescript
import { isFeatureEnabled, getConfig } from '@/config'

if (isFeatureEnabled('payments')) {
  /* ... */
}
const colors = getConfig().theme.colors
```

## Supabase Client – KRITISCH

```typescript
// Server Components / Server Actions (async!)
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()

// Client Components (Singleton)
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
```

## Data-Fetching Patterns

| Kontext          | Pattern             | Beispiel                                                                    |
| ---------------- | ------------------- | --------------------------------------------------------------------------- |
| Server Component | Direct Supabase     | `const { data } = await supabase.from('products').select()`                 |
| Client Component | TanStack Query Hook | `useProducts()` → [src/hooks/use-products.ts](../src/hooks/use-products.ts) |
| Client Mutations | Server Actions      | `'use server'` Direktive, NICHT API-Routes                                  |
| Client State     | Zustand Store       | `useCartStore()` → [src/stores/cart-store.ts](../src/stores/cart-store.ts)  |

## Ordnerstruktur

```
src/app/
├── (autohandel)/        # OpenCarBox Fahrzeuge → Blau-Theme
├── (shop)/              # Carvantooo Shop → Rot-Theme
├── (werkstatt)/         # OpenCarBox Services → Blau-Theme
└── api/                 # NUR Webhooks (Stripe, etc.)

src/components/
├── ui/                  # shadcn/ui Basis (IMMER von hier importieren)
├── shared/              # Markenübergreifende Komponenten
└── shop/, home/, ...    # Feature-spezifisch
```

## UI-Komponenten

```typescript
// ✅ Korrekt
import { Button } from '@/components/ui/button'

// ❌ Niemals direkt
import * as Button from '@radix-ui/react-button'
```

Brand-spezifische Button-Varianten existieren: `variant="carvantooo"` (rot), `variant="opencarbox"` (blau)

## Prisma + Supabase

Schema in [prisma/schema.prisma](../prisma/schema.prisma). Migrations via Supabase:

```bash
pnpm db:migrate    # supabase db push
pnpm db:generate   # TypeScript-Types generieren → src/types/database.ts
pnpm db:studio     # Supabase Studio öffnen
```

## Qualitätsprüfung

```bash
pnpm lint && pnpm type-check   # Vor jedem Commit
pnpm quality:check             # Lint + Types + Build
pnpm test                      # Vitest
pnpm test:e2e                  # Playwright
```

## Wichtige Patterns

1. **Feature-Flags prüfen** vor Feature-Code: `if (isFeatureEnabled('payments'))`
2. **Multi-Tenant Security**: `company_id` IMMER aus Session, NIE aus Request-Body
3. **Theme via CSS Variables**: Farben in `globals.css`, gesteuert durch `project.config.ts`
4. **Server Actions für Mutationen**: Keine API-Routes für CRUD-Operationen

## Architektur-Docs

- [docs/architecture/system-overview.md](../docs/architecture/system-overview.md) – Komplette System-Architektur
- [docs/architecture/data-flow.md](../docs/architecture/data-flow.md) – Datenfluss-Diagramme
