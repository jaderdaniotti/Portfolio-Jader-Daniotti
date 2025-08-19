import { useState, useEffect } from 'react';

export const useResourcePreloader = (resources) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentResource, setCurrentResource] = useState('');

    useEffect(() => {
        const preloadResources = async () => {
            if (!resources || resources.length === 0) {
                setLoading(false);
                return;
            }

            const totalResources = resources.length;
            let loadedResources = 0;

            const updateProgress = (resourceName) => {
                loadedResources++;
                setProgress((loadedResources / totalResources) * 100);
                setCurrentResource(resourceName);
            };

            try {
                // Precarica tutte le risorse
                const resourcePromises = resources.map((resource) => {
                    return new Promise((resolve) => {
                        if (resource.type === 'image') {
                            const img = new Image();
                            img.onload = () => {
                                updateProgress(`Caricamento: ${resource.name}`);
                                resolve();
                            };
                            img.onerror = () => {
                                updateProgress(`Errore: ${resource.name}`);
                                resolve(); // Continua anche se c'è un errore
                            };
                            img.src = resource.url;
                        } else if (resource.type === 'font') {
                            // Per i font, simuliamo il caricamento
                            setTimeout(() => {
                                updateProgress(`Font: ${resource.name}`);
                                resolve();
                            }, 100);
                        } else {
                            // Per altri tipi di risorse
                            setTimeout(() => {
                                updateProgress(`Risorsa: ${resource.name}`);
                                resolve();
                            }, 50);
                        }
                    });
                });

                await Promise.all(resourcePromises);

                // Simula un piccolo delay per mostrare il 100%
                await new Promise(resolve => setTimeout(resolve, 300));
                updateProgress('Completato!');

                // Nasconde il loader
                setTimeout(() => {
                    setLoading(false);
                }, 500);

            } catch (error) {
                console.error('Errore durante il precaricamento:', error);
                setLoading(false);
            }
        };

        preloadResources();
    }, [resources]);

    return { loading, progress, currentResource };
};
