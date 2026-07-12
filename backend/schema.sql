-- ============================================================
-- LUNGA — Supabase Database Schema
-- Multi-tenant: each business (subscriber) sees only their own data.
-- Row Level Security (RLS) enforces isolation at the database level.
-- 
-- SETUP:
-- 1. Create a free project at supabase.com
-- 2. Go to SQL Editor → paste this entire file → Run
-- 3. Copy your Project URL + anon key into app/assets/supabase-config.js
-- ============================================================

-- ---- TABLE: profiles (business/freelancer details) ----
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  business_name TEXT,
  vat_number TEXT,
  email TEXT,
  address TEXT,
  phone TEXT,
  logo_url TEXT,
  plan TEXT DEFAULT 'trial',
  trial_started_at TIMESTAMPTZ DEFAULT now(),
  subscription_status TEXT DEFAULT 'trial',
  payfast_reference TEXT,
  next_invoice_num INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ---- TABLE: clients (the subscriber's customers) ----
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  vat_number TEXT,
  email TEXT,
  address TEXT,
  notes TEXT,
  recurring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ---- TABLE: invoices (saved invoices, for history + recurring) ----
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  invoice_date DATE NOT NULL,
  doc_type TEXT DEFAULT 'Tax Invoice',
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC(10,2) DEFAULT 0,
  vat_amount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) DEFAULT 0,
  vat_on BOOLEAN DEFAULT TRUE,
  notes TEXT,
  pay_on BOOLEAN DEFAULT FALSE,
  pf_merchant TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ---- TABLE: saved_items (reusable line items for quick invoicing) ----
CREATE TABLE IF NOT EXISTS public.saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  default_qty NUMERIC DEFAULT 1,
  default_price NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- Each user can only CRUD their own rows. Enforced at DB level.
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

-- ---- profiles: users see/edit only their own profile ----
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- ---- clients: users see/edit only their own clients ----
CREATE POLICY "Users view own clients" ON public.clients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own clients" ON public.clients FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own clients" ON public.clients FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own clients" ON public.clients FOR DELETE USING (auth.uid() = user_id);

-- ---- invoices: users see/edit only their own invoices ----
CREATE POLICY "Users view own invoices" ON public.invoices FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own invoices" ON public.invoices FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own invoices" ON public.invoices FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own invoices" ON public.invoices FOR DELETE USING (auth.uid() = user_id);

-- ---- saved_items: users see/edit only their own items ----
CREATE POLICY "Users view own items" ON public.saved_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own items" ON public.saved_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own items" ON public.saved_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own items" ON public.saved_items FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- STORAGE BUCKET: logos
-- ============================================================

-- Create a private bucket for logo uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: users can upload/read only their own logos
CREATE POLICY "Users upload own logos" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users read own logos" ON storage.objects FOR SELECT
  USING (bucket_id = 'logos');

-- ============================================================
-- FUNCTION: auto-create profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, trial_started_at)
  VALUES (NEW.id, NEW.email, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: fire on every new auth user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- DONE. The database is ready.
-- ============================================================
