-- Script SQL per aggiungere la colonna device_type alla tabella project_images
-- Esegui nel SQL Editor di Supabase

-- Aggiungi la colonna device_type per classificare le immagini per tipo di dispositivo
ALTER TABLE public.project_images
ADD COLUMN device_type VARCHAR(20) DEFAULT 'pc' 
CHECK (device_type IN ('tablet', 'pc', 'mobile'));

-- Commento sulla colonna per documentazione
COMMENT ON COLUMN public.project_images.device_type IS 'Tipo di dispositivo per cui è destinata l''immagine: tablet, pc, o mobile';

-- Esempio di aggiornamento per immagini esistenti (opzionale)
-- UPDATE public.project_images SET device_type = 'pc' WHERE device_type IS NULL;

