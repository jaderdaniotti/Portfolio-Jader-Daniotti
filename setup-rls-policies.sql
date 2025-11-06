-- Script SQL per configurare le Row-Level Security policies
-- Esegui questo script nel SQL Editor di Supabase

-- ============================================
-- 1. TABELLA PROJECTS - RLS Policies
-- ============================================

-- Abilita RLS sulla tabella projects (se non già abilitato)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy per SELECT: permette a tutti di leggere i progetti
CREATE POLICY "Allow public read access on projects"
ON public.projects
FOR SELECT
USING (true);

-- Policy per INSERT: permette inserimento (per admin)
-- NOTA: Se usi autenticazione Supabase, cambia questa policy
-- Per ora la lasciamo aperta per permettere inserimenti
CREATE POLICY "Allow insert on projects"
ON public.projects
FOR INSERT
WITH CHECK (true);

-- Policy per UPDATE: permette aggiornamenti
CREATE POLICY "Allow update on projects"
ON public.projects
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Policy per DELETE: permette eliminazioni
CREATE POLICY "Allow delete on projects"
ON public.projects
FOR DELETE
USING (true);

-- ============================================
-- 2. STORAGE BUCKET - Policies
-- ============================================
-- NOTA: Le policies per lo storage vanno configurate tramite l'API o l'interfaccia
-- Ecco le policies che devi creare manualmente:

-- Per lo storage, vai su: Storage > Policies > portfolio-assets
-- E crea queste policies:

-- Policy 1: SELECT (lettura pubblica)
-- Name: "Public Access"
-- Allowed operation: SELECT
-- Target roles: public
-- Policy definition: (bucket_id = 'portfolio-assets')

-- Policy 2: INSERT (upload)
-- Name: "Allow uploads"
-- Allowed operation: INSERT
-- Target roles: public
-- Policy definition: (bucket_id = 'portfolio-assets')

-- Policy 3: UPDATE (aggiornamento)
-- Name: "Allow updates"
-- Allowed operation: UPDATE
-- Target roles: public
-- Policy definition: (bucket_id = 'portfolio-assets')

-- Policy 4: DELETE (eliminazione)
-- Name: "Allow deletes"
-- Allowed operation: DELETE
-- Target roles: public
-- Policy definition: (bucket_id = 'portfolio-assets')

-- ============================================
-- ALTERNATIVA: Se preferisci usare Service Role Key
-- ============================================
-- Invece di modificare le policies, puoi usare supabaseAdmin
-- per le operazioni admin. Modifica il codice per usare supabaseAdmin
-- quando l'utente è loggato come admin.


