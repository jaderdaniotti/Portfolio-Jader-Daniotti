-- Script SQL per Database Portfolio
-- Esegui nel SQL Editor di Supabase

-- 1. TABELLA USERS
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELLA STRUMENTI
CREATE TABLE tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  svg_code TEXT NOT NULL,
  percent INTEGER DEFAULT 0 CHECK (percent >= 0 AND percent <= 100),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELLA TECNOLOGIE/LINGUAGGI
CREATE TABLE technologies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  svg_code TEXT NOT NULL,
  percent INTEGER DEFAULT 0 CHECK (percent >= 0 AND percent <= 100),
  category VARCHAR(50) NOT NULL CHECK (category IN ('frontend', 'backend', 'database', 'tools')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELLA PROGETTI
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  cover_image TEXT,
  github_url TEXT,
  domain_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELLA IMMAGINI PROGETTI
CREATE TABLE project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABELLA VIDEO PROGETTI
CREATE TABLE project_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABELLA RELAZIONE PROGETTI-TECNOLOGIE
CREATE TABLE project_technologies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  technology_id UUID REFERENCES technologies(id) ON DELETE CASCADE,
  type VARCHAR(20) DEFAULT 'frontend' CHECK (type IN ('frontend', 'backend')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, technology_id, type)
);

-- INSERIMENTO DATI DI ESEMPIO

-- Inserisci admin user
INSERT INTO users (email, password, role) VALUES 
('jaderdaniotti.lavoro@gmail.com', 'Milanista', 'admin');

-- Inserisci strumenti
INSERT INTO tools (name, svg_code, percent, order_index) VALUES 
('VS Code', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><mask id="a" width="128" height="128" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#fff" fill-rule="evenodd" d="M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z" clip-rule="evenodd"/></mask><g mask="url(#a)"><path fill="#0065A9" d="M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z"/></g></svg>', 100, 1),
('VS', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#68217a" d="M95 2.3l30.5 12.3v98.7l-30.7 12.4-49-48.7-31 24.1-12.3-6.2V33.1l12.3-5.9 31 24.3zM14.8 45.7v37.5l18.5-19zm48.1 18.5l31.9 25.1V39z"/></svg>', 100, 2),
('GITHUB', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g fill="#D8D7E0"><path fill-rule="evenodd" clip-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"/></g></svg>', 100, 3),
('GIT', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/></svg>', 90, 4);

-- Inserisci tecnologie
INSERT INTO technologies (name, svg_code, percent, category, order_index) VALUES 
-- Frontend
('HTML', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/></svg>', 95, 'frontend', 1),
('CSS', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/></svg>', 90, 'frontend', 2),
('JS', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/></svg>', 80, 'frontend', 3),
('REACT', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/></g></svg>', 85, 'frontend', 4),
('TAILWIND', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597" fill="#38bdf8"/></svg>', 90, 'frontend', 5),
-- Backend
('PHP', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#777bb3" d="M64 95.167c33.965 0 61.5-13.955 61.5-31.167 0-17.214-27.535-31.167-61.5-31.167S2.5 46.786 2.5 64c0 17.212 27.535 31.167 61.5 31.167Z"/></svg>', 70, 'backend', 1),
('LARAVEL', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#FF2D20" d="M26.027344 0.136719C25.824219 0.214844 20.085938 3.484375 13.28125 7.394531"/></svg>', 70, 'backend', 2),
('MYSQL', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#00618A" d="M116.948 97.807c-6.863-.187-12.104.452-16.585 2.341"/></svg>', 60, 'database', 1),
('SUPABASE', '<svg viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint0_linear)"/></svg>', 80, 'database', 2);

-- Inserisci progetti di esempio
INSERT INTO projects (title, description, cover_image, github_url, domain_url, featured, order_index) VALUES 
('VENDOR', 'Sito di annunci online con funzionalità di ricerca avanzata, filtri e gestione degli annunci.', '/immagini/ANTEPRIME/VENDOR.png', 'https://github.com/jaderdaniotti/VENDOR', null, true, 1),
('SECONDLIFECARS', 'Vetrina online di auto con funzionalità di ricerca avanzata e visualizzazione dettagli con contatto all''azienda.', '/immagini/ANTEPRIME/SECONDLIFE.png', 'https://github.com/jaderdaniotti/Garage-Chelini', 'https://secondlifecars.it/', true, 2),
('JDEAM', 'Libreria di videogiochi con possibilità di filtrare, aggiungere ai preferiti e visualizzare i dettagli dei giochi.', '/immagini/ANTEPRIME/JDEAM.png', 'https://github.com/jaderdaniotti/JDEAM-', null, false, 3),
('AVEN', 'Sito vetrina in correlato con l''uscita di un album, anteprima di video e link per ascoltare i brani.', '/immagini/ANTEPRIME/AVEN.png', 'https://github.com/jaderdaniotti/AVEN---L-ODIO', null, false, 4),
('BBSBARBER', 'Sito web vetrina per un Barber, anteprima di servizi e tagli, contatti e link per prenotare un appuntamento.', '/immagini/ANTEPRIME/BBS.png', 'https://github.com/jader/social-media-analytics', 'https://bbsbarber.com/', false, 5);

-- Funzione per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger per updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_technologies_updated_at BEFORE UPDATE ON technologies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
