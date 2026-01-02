-- Aggiorna il constraint CHECK per project_technologies per includere 'database'
-- Esegui questo script nel SQL Editor di Supabase

-- Prima elimina il constraint esistente
ALTER TABLE project_technologies 
DROP CONSTRAINT IF EXISTS project_technologies_type_check;

-- Poi aggiungi il nuovo constraint che include anche 'database'
ALTER TABLE project_technologies 
ADD CONSTRAINT project_technologies_type_check 
CHECK (type IN ('frontend', 'backend', 'database'));

