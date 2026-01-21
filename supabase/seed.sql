-- ============================================================
-- NeXifyAI Starter-Kit: Seed Data
-- ============================================================
-- 
-- Test-Daten für lokale Entwicklung
-- NIEMALS in Produktion ausführen!
--
-- Ausführen: supabase db seed
-- ============================================================

-- ============================================================
-- Test-Benutzer (werden bei Auth-Signup automatisch angelegt)
-- ============================================================

-- Hinweis: In Supabase müssen User über Auth-API erstellt werden
-- Diese Seed-Daten erwarten, dass bereits User existieren
-- Alternativ: supabase/functions für User-Seed nutzen

-- ============================================================
-- Test-Company
-- ============================================================

INSERT INTO public.companies (id, name, slug, email, plan, settings) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Demo Company GmbH',
  'demo-company',
  'demo@example.com',
  'business',
  '{
    "branding": {
      "primaryColor": "#3B82F6",
      "logoUrl": "/demo-logo.svg"
    },
    "features": {
      "multiLanguage": true,
      "analytics": true
    }
  }'::jsonb
),
(
  '00000000-0000-0000-0000-000000000002',
  'Test Startup',
  'test-startup',
  'test@example.com',
  'starter',
  '{}'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Test-Kategorien (wenn E-Commerce aktiviert)
-- ============================================================

INSERT INTO public.categories (id, company_id, name, slug, description, position) VALUES
(
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Elektronik',
  'elektronik',
  'Computer, Smartphones und mehr',
  1
),
(
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Kleidung',
  'kleidung',
  'Mode für jeden Anlass',
  2
),
(
  '10000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'Bücher',
  'buecher',
  'Literatur und Fachbücher',
  3
)
ON CONFLICT (company_id, slug) DO NOTHING;

-- ============================================================
-- Test-Produkte (wenn E-Commerce aktiviert)
-- ============================================================

INSERT INTO public.products (
  id, company_id, category_id, name, slug, 
  description, short_description,
  price, compare_at_price, stock_quantity,
  status, is_featured, images
) VALUES
(
  '20000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'MacBook Pro 14"',
  'macbook-pro-14',
  'Das leistungsstärkste MacBook aller Zeiten. Mit M3 Pro Chip für maximale Performance.',
  'Leistungsstarkes Notebook mit M3 Pro',
  2499.00,
  2799.00,
  10,
  'active',
  true,
  ARRAY['/products/macbook-1.jpg', '/products/macbook-2.jpg']
),
(
  '20000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'iPhone 15 Pro',
  'iphone-15-pro',
  'Das fortschrittlichste iPhone. Mit Titan-Design und Action-Button.',
  'Premium-Smartphone mit Titan',
  1199.00,
  NULL,
  25,
  'active',
  true,
  ARRAY['/products/iphone-1.jpg']
),
(
  '20000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'Premium Hoodie',
  'premium-hoodie',
  'Bequemer Hoodie aus 100% Bio-Baumwolle. Perfekt für jeden Tag.',
  'Bio-Baumwoll-Hoodie',
  89.00,
  119.00,
  50,
  'active',
  false,
  ARRAY['/products/hoodie-1.jpg', '/products/hoodie-2.jpg']
),
(
  '20000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000003',
  'Clean Code',
  'clean-code-buch',
  'Das Standardwerk für sauberen Code von Robert C. Martin.',
  'Fachbuch für Entwickler',
  34.99,
  NULL,
  100,
  'active',
  false,
  ARRAY['/products/clean-code.jpg']
)
ON CONFLICT (company_id, slug) DO NOTHING;

-- ============================================================
-- Test-Produkt-Varianten
-- ============================================================

INSERT INTO public.product_variants (id, product_id, options, price, stock_quantity) VALUES
-- Hoodie Varianten
(
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000003',
  '{"size": "S", "color": "schwarz"}'::jsonb,
  NULL,
  15
),
(
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000003',
  '{"size": "M", "color": "schwarz"}'::jsonb,
  NULL,
  20
),
(
  '30000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000003',
  '{"size": "L", "color": "schwarz"}'::jsonb,
  NULL,
  15
),
(
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000003',
  '{"size": "M", "color": "grau"}'::jsonb,
  NULL,
  10
),
-- iPhone Varianten
(
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000002',
  '{"storage": "128GB", "color": "Titan Schwarz"}'::jsonb,
  1199.00,
  10
),
(
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000002',
  '{"storage": "256GB", "color": "Titan Schwarz"}'::jsonb,
  1329.00,
  8
),
(
  '30000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000002',
  '{"storage": "256GB", "color": "Titan Blau"}'::jsonb,
  1329.00,
  7
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Hinweis zur Nutzung
-- ============================================================

-- Diese Seed-Datei wird ausgeführt mit:
--
--   supabase db seed
--
-- Oder in Docker:
--
--   docker exec -i supabase-db psql -U postgres < supabase/seed.sql
--
-- WICHTIG: Nur für Development-Umgebungen!
