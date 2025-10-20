// Configurazione centralizzata per i modelli 3D
// Importa tutti i modelli GLB da src/assets/3D/
import phoneModelUrl from '../assets/3D/apple_iphone_15_pro_max_black.glb';
import mouseModelUrl from '../assets/3D/computer_mouse_a4tech_bloody_v7.glb';
import laptopModelUrl from '../assets/3D/laptop.glb';
import cyberCoreUrl from '../assets/3D/cyber_core.glb';

// Esporta gli URL dei modelli 3D per uso centralizzato
export const threeAssetUrls = {
    phone: phoneModelUrl,
    mouse: mouseModelUrl,
    laptop: laptopModelUrl,
    sciFiRoom: cyberCoreUrl,
};

// Metadati dei modelli per debug e informazioni
export const threeAssetMetadata = {
    phone: {
        name: 'iPhone 15 Pro Max',
        scale: [18, 18, 18],
        cameraPosition: [0, 0, 3],
        autoRotateSpeed: 0.5,
        minDistance: 2,
        maxDistance: 6,
    },
    mouse: {
        name: 'Computer Mouse A4Tech Bloody V7',
        scale: [0.2, 0.2, 0.2],
        cameraPosition: [0, 0, 2],
        autoRotateSpeed: 0.3,
        minDistance: 1.5,
        maxDistance: 4,
    },
    laptop: {
        name: 'Laptop',
        scale: [0.065, 0.055, 0.065],
        cameraPosition: [0, 0, 2.5],
        autoRotateSpeed: 0.4,
        minDistance: 2,
        maxDistance: 5,
    },
    sciFiRoom: {
        name: 'Cyber Core',
        // Scala conservativa; il modello verrà centrato e adattato
        scale: [0.8, 0.8, 0.8],
        cameraPosition: [0, 0, 3],
        autoRotateSpeed: 0.3,
        minDistance: 1.5,
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
