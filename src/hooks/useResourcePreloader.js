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
                // 1. Carica prima i dati dei progetti da Supabase
                setCurrentResource('Caricamento dati progetti...');
                const { data: projectsData, error: projectsError } = await supabase
                    .from('projects')
                    .select('id, cover_image')
                    .order('order_index');

                if (projectsError) {
                    console.error('Errore caricamento progetti:', projectsError);
                }

                // 2. Carica tutte le immagini dei progetti
                const { data: imagesData, error: imagesError } = await supabase
                    .from('project_images')
                    .select('image_url');

                if (imagesError) {
                    console.error('Errore caricamento immagini progetti:', imagesError);
                }

                // 3. Prepara la lista di tutte le risorse da precaricare
                const allResources = [
                    { name: 'Font Horizon', type: 'font', url: '/src/assets/fonts/Horizon.otf', family: 'Horizon' },
                    { name: threeAssetMetadata.roboticHand.name, type: 'glb', url: threeAssetUrls.roboticHand },
                ];

                // Aggiungi le cover images dei progetti
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

                // Aggiungi le immagini dei progetti (limita a max 20 per non rallentare troppo)
                if (imagesData && imagesData.length > 0) {
                    const limitedImages = imagesData.slice(0, 20);
                    limitedImages.forEach((img, index) => {
                        if (img.image_url) {
                            allResources.push({
                                name: `Immagine Progetto ${index + 1}`,
                                type: 'image',
                                url: img.image_url
                            });
                        }
                    });
                }

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
