-- ============================================================
-- NeXifyAI Starter-Kit: Multi-Tenant Schema
-- ============================================================
-- 
-- Aktiviert durch: database.schemas.multiTenant = true
-- 
-- Tabellen:
--   - companies (Mandanten/Firmen)
--   - company_members (Zuordnung User <-> Company)
--
-- RLS: Aktiviert – User sehen nur Daten ihrer Company
-- ============================================================

-- Companies Tabelle
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basis-Daten
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  
  -- Kontakt
  email TEXT,
  phone TEXT,
  website TEXT,
  
  -- Adresse
  address JSONB DEFAULT '{}'::jsonb,
  
  -- Einstellungen
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Plan/Subscription
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'business', 'enterprise')),
  plan_expires_at TIMESTAMPTZ,
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indizes
CREATE INDEX IF NOT EXISTS idx_companies_slug ON public.companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_plan ON public.companies(plan);

-- ============================================================
-- Company Members (Zuordnung)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.company_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Zuordnung
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Rolle innerhalb der Company
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ DEFAULT now(),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- User kann nur einmal pro Company sein
  CONSTRAINT unique_company_member UNIQUE (company_id, user_id)
);

-- Indizes
CREATE INDEX IF NOT EXISTS idx_company_members_company ON public.company_members(company_id);
CREATE INDEX IF NOT EXISTS idx_company_members_user ON public.company_members(user_id);

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;

-- Companies: User sieht nur eigene Companies
CREATE POLICY "Users can view own companies"
  ON public.companies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.company_members
      WHERE company_id = companies.id
      AND user_id = auth.uid()
      AND is_active = true
    )
  );

-- Companies: Nur Owner/Admin können updaten
CREATE POLICY "Admins can update company"
  ON public.companies FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.company_members
      WHERE company_id = companies.id
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
      AND is_active = true
    )
  );

-- Company Members: Sehen nur Members eigener Company
CREATE POLICY "Users can view company members"
  ON public.company_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = company_members.company_id
      AND cm.user_id = auth.uid()
      AND cm.is_active = true
    )
  );

-- Company Members: Nur Owner/Admin können Members verwalten
CREATE POLICY "Admins can manage members"
  ON public.company_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = company_members.company_id
      AND cm.user_id = auth.uid()
      AND cm.role IN ('owner', 'admin')
      AND cm.is_active = true
    )
  );

-- ============================================================
-- Hilfsfunktion: Aktuelle Company ID holen
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_current_company_id()
RETURNS UUID AS $$
  SELECT company_id 
  FROM public.company_members 
  WHERE user_id = auth.uid() 
  AND is_active = true 
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- Profil um company_id erweitern
-- ============================================================

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS current_company_id UUID REFERENCES public.companies(id);

-- Updated_at Trigger
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_company_members_updated_at
  BEFORE UPDATE ON public.company_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
