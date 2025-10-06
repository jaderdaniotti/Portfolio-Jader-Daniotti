-- Aggiungi colonna password alla tabella users
ALTER TABLE users ADD COLUMN password VARCHAR(255);

-- Aggiorna l'account esistente con la password "Milanista"
UPDATE users 
SET password = 'Milanista' 
WHERE email = 'jaderdaniotti.lavoro@gmail.com';

-- Verifica l'aggiornamento
SELECT id, email, role, password, created_at, updated_at 
FROM users 
WHERE email = 'jaderdaniotti.lavoro@gmail.com';
