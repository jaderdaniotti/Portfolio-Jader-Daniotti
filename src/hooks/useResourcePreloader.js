import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { threeAssetUrls, threeAssetMetadata } from '../config/threeAssets';

export const useResourcePreloader = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentResource, setCurrentResource] = useState('');

    useEffect(() => {
        const preloadAll = async () => {
            // Definisce tutte le risorse 3D da precaricare
            const allResources = [
                { name: threeAssetMetadata.phone.name, type: 'glb', url: threeAssetUrls.phone },
                { name: threeAssetMetadata.laptop.name, type: 'glb', url: threeAssetUrls.laptop },
                { name: threeAssetMetadata.mouse.name, type: 'glb', url: threeAssetUrls.mouse },
            ];

            const total = allResources.length;
            let loaded = 0;

            const updateProgress = (resourceName) => {
                loaded++;
                setProgress(Math.round((loaded / total) * 100));
                setCurrentResource(resourceName);
            };

            try {
                // Precarica tutti i modelli 3D
                for (const res of allResources) {
                    if (res.type === 'glb') {
                        try {
                            useGLTF.preload(res.url);
                            updateProgress(`Modello 3D: ${res.name}`);
                        } catch (e) {
                            console.warn('Preload GLB fallito:', res.url, e);
                            updateProgress(`Errore modello 3D: ${res.name}`);
                        }
                        // Piccolo delay tra ogni modello per evitare sovraccarico
                        await new Promise(resolve => setTimeout(resolve, 200));
                    }
                }

                // Simula un piccolo delay per mostrare il 100%
                await new Promise(resolve => setTimeout(resolve, 500));
                updateProgress('Completato!');

                // Nasconde il loader dopo un breve delay
                setTimeout(() => {
                    setLoading(false);
                }, 500);

            } catch (error) {
                console.error('Errore durante il precaricamento dei modelli 3D:', error);
                setLoading(false);
            }
        };

        preloadAll();
    }, []);

    return { loading, progress, currentResource };
};
