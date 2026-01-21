---
applyTo: '**'
---

# NeXifyAI Starter-Kit – AI-Anweisungen

## Stack

- **Framework:** Next.js 15+ (App Router)
- **Datenbank:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Deployment:** Vercel
- **UI:** Tailwind CSS + shadcn/ui
- **Sprache:** TypeScript (strict)

## Architektur-Prinzip: Konfigurieren statt Coden

Die zentrale `project.config.ts` steuert ALLES:
- Features werden per Flag aktiviert/deaktiviert
- Datenbank-Schema wird aus Config generiert
- Theme-Farben kommen aus Config
- SEO-Defaults kommen aus Config

**NIEMALS Features hardcoden** – immer Config auslesen!

## Dateien-Referenz

Lies diese Dateien für vollständige Regeln:

- `../.github/UNIFIED_RULES.md` – Entwicklungsregeln
- `../.github/UNIFIED_WORKFLOWS.md` – CI/CD-Workflows
- `../.github/UNIFIED_SKILLS.md` – Arbeitsweise

## Kritische Regeln

### 1. Supabase Client

```typescript
// Server Components / Server Actions
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()

// Client Components
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
```

### 2. Multi-Tenant Security (wenn aktiviert)

```typescript
// ❌ NIEMALS company_id aus Client
const { company_id } = request.body

// ✅ IMMER aus Session ableiten
const { data: profile } = await supabase
  .from('profiles')
  .select('company_id')
  .eq('id', user.id)
  .single()
```

### 3. Feature-Flags prüfen

```typescript
import { isFeatureEnabled } from '@/config'

// Vor Feature-Nutzung prüfen
if (isFeatureEnabled('payments')) {
  // Payment-Code
}
```

### 4. Komponenten aus shadcn/ui

```typescript
// ✅ Immer aus components/ui importieren
import { Button } from '@/components/ui/button'

// ❌ Niemals direkt von radix
import * as Button from '@radix-ui/react-button'
```

### 5. Server Actions für Mutationen

```typescript
// ✅ Server Actions
'use server'
export async function createItem(data: FormData) {
  const supabase = await createClient()
  // ...
}

// ❌ Keine API-Routes für CRUD
// app/api/items/route.ts – vermeiden
```

## Ordnerstruktur

```
src/
├── app/
│   ├── (auth)/           # Login, Register, Reset
│   ├── (dashboard)/      # Geschützte Seiten
│   ├── (public)/         # Öffentliche Seiten
│   └── api/              # Nur für Webhooks
├── components/
│   ├── ui/               # shadcn/ui Basis
│   └── [feature]/        # Feature-Komponenten
├── lib/
│   ├── supabase/         # Supabase Clients
│   └── utils/            # Hilfsfunktionen
└── config/               # Config-Loader
```

## Vor jeder Änderung

1. `project.config.ts` prüfen – ist Feature aktiviert?
2. Bestehende Patterns in Codebase suchen
3. UNIFIED_RULES.md Abschnitt lesen
4. Nach Änderung: `pnpm lint && pnpm type-check`
