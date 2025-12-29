import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { threeAssetUrls, threeAssetMetadata } from '../config/threeAssets';
import { supabase } from '../config/supabase';

export const useResourcePreloader = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentResource, setCurrentResource] = useState('');

    useEffect(() => {
        const preloadAll = async () => {
            try {
                // 1. Carica solo i dati dei progetti da Supabase (senza immagini)
                setCurrentResource('Caricamento dati progetti...');
                const { data: projectsData, error: projectsError } = await supabase
                    .from('projects')
                    .select('id, title, description, cover_image, order_index')
                    .order('order_index')
                    .limit(12);

                if (projectsError) {
                    console.error('Errore caricamento progetti:', projectsError);
                }

                // 2. Prepara la lista di tutte le risorse da precaricare
                const allResources = [
                    { name: 'Font Horizon', type: 'font', url: '/src/assets/fonts/Horizon.otf', family: 'Horizon' },
                    { name: threeAssetMetadata.roboticHand.name, type: 'glb', url: threeAssetUrls.roboticHand },
                ];

                // Aggiungi solo le cover images dei progetti (necessarie per le card)
                if (projectsData && projectsData.length > 0) {
                    projectsData.forEach((project, index) => {
                        if (project.cover_image) {
                            allResources.push({
                                name: `Cover Progetto ${index + 1}`,
                                type: 'image',
                                url: project.cover_image
                            });
                        }
                    });
                }

                // NON carichiamo più tutte le immagini dei progetti qui
                // Verranno caricate on-demand nella pagina di dettaglio

                const total = allResources.length;
                let loaded = 0;

                const updateProgress = (resourceName) => {
                    loaded++;
                    setProgress(Math.round((loaded / total) * 100));
                    setCurrentResource(resourceName);
                };

                // Funzione per precaricare i font
                const preloadFont = async (fontFamily, fontUrl) => {
                    try {
                        const font = new FontFace(fontFamily, `url(${fontUrl})`);
                        await font.load();
                        document.fonts.add(font);
                        return true;
                    } catch (e) {
                        console.warn('Preload font fallito:', fontUrl, e);
                        return false;
                    }
                };

                // Funzione per precaricare le immagini
                const preloadImage = (url) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => resolve(true);
                        img.onerror = () => {
                            console.warn('Preload immagine fallito:', url);
                            resolve(false); // Risolvi comunque per non bloccare il caricamento
                        };
                        img.src = url;
                    });
                };

                // Precarica tutte le risorse in ordine
                for (const res of allResources) {
                    if (res.type === 'font') {
                        try {
                            await preloadFont(res.family, res.url);
                            updateProgress(`Font: ${res.name}`);
                        } catch (e) {
                            console.warn('Preload font fallito:', res.url, e);
                            updateProgress(`Errore font: ${res.name}`);
                        }
                        await new Promise(resolve => setTimeout(resolve, 100));
                    } else if (res.type === 'glb') {
                        try {
                            useGLTF.preload(res.url);
                            updateProgress(`Modello 3D: ${res.name}`);
                        } catch (e) {
                            console.warn('Preload GLB fallito:', res.url, e);
                            updateProgress(`Errore modello 3D: ${res.name}`);
                        }
                        await new Promise(resolve => setTimeout(resolve, 100));
                    } else if (res.type === 'image') {
                        try {
                            await preloadImage(res.url);
                            updateProgress(`${res.name}`);
                        } catch (e) {
                            console.warn('Preload immagine fallito:', res.url, e);
                            updateProgress(`Errore: ${res.name}`);
                        }
                        // Delay più breve per le immagini per velocizzare
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }
                }

                // Simula un piccolo delay per mostrare il 100%
                await new Promise(resolve => setTimeout(resolve, 300));
                updateProgress('Completato!');

                // Nasconde il loader dopo un breve delay
                setTimeout(() => {
                    setLoading(false);
                }, 300);

            } catch (error) {
                console.error('Errore durante il precaricamento delle risorse:', error);
                setLoading(false);
            }
        };

        preloadAll();
    }, []);

    return { loading, progress, currentResource };
};
