// Configurazione centralizzata per i modelli 3D
// Importa tutti i modelli GLB da src/assets/3D/
import robotPlaygroundUrl from '../assets/3D/robot_playground.glb';

// Esporta gli URL dei modelli 3D per uso centralizzato
export const threeAssetUrls = {
    roboticHand: robotPlaygroundUrl,
};

// Metadati dei modelli per debug e informazioni
export const threeAssetMetadata = {
    roboticHand: {
        name: 'Robotic Hand',
        scale: [1, 1, 1],
        cameraPosition: [0, 0, 3],
        autoRotateSpeed: 0.5,
        minDistance: 2,
        maxDistance: 6,
    },
};

// Funzione helper per precaricare tutti i modelli
export const preloadAllModels = (useGLTF) => {
    Object.values(threeAssetUrls).forEach(url => {
        try {
            useGLTF.preload(url);
        } catch (error) {
            console.warn('Errore nel precaricamento del modello:', url, error);
        }
    });
};
