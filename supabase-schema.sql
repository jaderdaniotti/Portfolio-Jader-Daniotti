-- Script SQL per creare le tabelle del portfolio in Supabase
-- Esegui questi comandi nel SQL Editor di Supabase

-- Tabella per il profilo personale
CREATE TABLE IF NOT EXISTS profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(200),
  description TEXT,
  email VARCHAR(100),
  phone VARCHAR(20),
  location VARCHAR(100),
  avatar_url TEXT,
  resume_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per i progetti
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array di tecnologie utilizzate
  category VARCHAR(50), -- Es: web, mobile, desktop
  status VARCHAR(20) DEFAULT 'completed', -- completed, in-progress, planned
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per le competenze
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50), -- Es: frontend, backend, database, tools
  level INTEGER CHECK (level >= 1 AND level <= 5), -- Livello da 1 a 5
  icon_url TEXT,
  color VARCHAR(7), -- Codice colore esadecimale
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per i messaggi di contatto
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per le esperienze lavorative
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company VARCHAR(200) NOT NULL,
  position VARCHAR(200) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  location VARCHAR(100),
  company_logo_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per le certificazioni
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  issuer VARCHAR(200),
  issue_date DATE,
  expiry_date DATE,
  credential_id VARCHAR(100),
  credential_url TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserimento dati di esempio per il profilo
INSERT INTO profile (name, title, description, email, location) VALUES 
('Jader Daniotti', 'Full Stack Developer', 'Sviluppatore appassionato di tecnologie web moderne', 'jader@example.com', 'Italia');

-- Inserimento competenze di esempio
INSERT INTO skills (name, category, level, color, order_index) VALUES 
('React', 'frontend', 5, '#61DAFB', 1),
('JavaScript', 'frontend', 5, '#F7DF1E', 2),
('Node.js', 'backend', 4, '#339933', 3),
('PHP', 'backend', 4, '#777BB4', 4),
('Laravel', 'backend', 4, '#FF2D20', 5),
('MySQL', 'database', 4, '#4479A1', 6),
('Tailwind CSS', 'frontend', 5, '#06B6D4', 7),
('Supabase', 'database', 4, '#3ECF8E', 8);

-- Inserimento progetti di esempio
INSERT INTO projects (title, short_description, description, technologies, category, featured, order_index) VALUES 
('Portfolio Website', 'Sito portfolio personale con React e Tailwind CSS', 'Un portfolio moderno e responsive sviluppato con React, Tailwind CSS e animazioni GSAP. Include sezioni per progetti, competenze e contatti.', ARRAY['React', 'Tailwind CSS', 'GSAP', 'Vite'], 'web', true, 1),
('E-commerce Platform', 'Piattaforma e-commerce completa con Laravel', 'Sistema e-commerce full-stack con Laravel backend, frontend React e integrazione pagamenti. Gestione completa di prodotti, ordini e utenti.', ARRAY['Laravel', 'React', 'MySQL', 'Stripe'], 'web', true, 2);

-- Abilitazione Row Level Security (RLS)
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Policy per permettere lettura pubblica
CREATE POLICY "Public read access" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read access" ON certifications FOR SELECT USING (true);

-- Policy per permettere inserimento messaggi di contatto
CREATE POLICY "Allow contact message insert" ON contact_messages FOR INSERT WITH CHECK (true);

-- Funzione per aggiornare updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger per aggiornare updated_at
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
