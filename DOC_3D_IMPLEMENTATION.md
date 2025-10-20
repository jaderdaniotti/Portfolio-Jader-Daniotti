## 3D Components Playbook — Implementazione riutilizzabile con React Three Fiber

Obiettivo: seguendo questo documento in un progetto nuovo o esistente otterrai la stessa implementazione 3D funzionante identica a questa (preload unificato, cache drei sincronizzata, Canvas ottimizzati e gestione StrictMode).

### Requisiti
- React 18+
- Vite/Next/CRA (qualsiasi bundler moderno)
- Dipendenze:
```bash
npm i three @react-three/fiber @react-three/drei
```

### Struttura consigliata
```
src/
  assets/3D/               # GLB/GLTF locali importati via bundler
  components/
    Phone3D.jsx
    Mouse3D.jsx
    Laptop3D.jsx
    Simple3DFallback.jsx   # fallback leggero opzionale
    GlobalLoader.jsx       # loader globale opzionale
  config/
    threeAssets.js         # configurazione URL + metadati
  hooks/
    useResourcePreloader.js
  main.jsx                 # gestione StrictMode in dev
```

---
### 1) Configurazione centralizzata modelli 3D
Crea `src/config/threeAssets.js` e importa i GLB da `src/assets/3D/` per sfruttare hashing+caching del bundler.
```javascript
// src/config/threeAssets.js
// Config centralizzata URL e metadati (commenti in italiano per manutenzione)
import phoneModelUrl from '../assets/3D/apple_iphone_15_pro_max_black.glb';
import mouseModelUrl from '../assets/3D/computer_mouse_a4tech_bloody_v7.glb';
import laptopModelUrl from '../assets/3D/laptop.glb';

export const threeAssetUrls = {
  phone: phoneModelUrl,
  mouse: mouseModelUrl,
  laptop: laptopModelUrl,
};

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
};
```

Note importanti:
- Carica i modelli SOLO da `src/assets/3D/`. Evita `public/` per prevenire duplicati e cache incoerente.

---
### 2) Preloader unificato (sincronizzato con cache di drei)
Crea `src/hooks/useResourcePreloader.js` che pre-carica tutti i GLB configurati.
```javascript
// src/hooks/useResourcePreloader.js
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { threeAssetUrls, threeAssetMetadata } from '../config/threeAssets';

export const useResourcePreloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentResource, setCurrentResource] = useState('');

  useEffect(() => {
    const preloadAll = async () => {
      const allResources = [
        { name: threeAssetMetadata.phone.name, type: 'glb', url: threeAssetUrls.phone },
        { name: threeAssetMetadata.laptop.name, type: 'glb', url: threeAssetUrls.laptop },
        { name: threeAssetMetadata.mouse.name, type: 'glb', url: threeAssetUrls.mouse },
      ];

      const total = allResources.length;
      let loaded = 0;
      const update = (name) => { loaded++; setProgress(Math.round((loaded/total)*100)); setCurrentResource(name); };

      try {
        for (const res of allResources) {
          if (res.type === 'glb') {
            try { useGLTF.preload(res.url); update(`Modello 3D: ${res.name}`); } 
            catch (e) { console.warn('Preload GLB fallito:', res.url, e); update(`Errore modello 3D: ${res.name}`); }
            await new Promise(r => setTimeout(r, 200));
          }
        }
        await new Promise(r => setTimeout(r, 500));
        setLoading(false);
      } catch (err) {
        console.error('Errore durante il precaricamento dei modelli 3D:', err);
        setLoading(false);
      }
    };

    preloadAll();
  }, []);

  return { loading, progress, currentResource };
};
```

Uso tipico in un loader globale opzionale:
```javascript
// src/components/GlobalLoader.jsx
import { useResourcePreloader } from '../hooks/useResourcePreloader';

const GlobalLoader = ({ onLoadingComplete }) => {
  const { loading } = useResourcePreloader();
  if (!loading && onLoadingComplete) setTimeout(onLoadingComplete, 100);
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="loading loading-spinner loading-lg text-white" />
    </div>
  );
};
export default GlobalLoader;
```

---
### 3) Template componente 3D riutilizzabile
Esempio: `Phone3D.jsx`. Copia lo stesso schema per Mouse/Laptop cambiando key in `threeAssetUrls`/`threeAssetMetadata`.
```javascript
// src/components/Phone3D.jsx
import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, PresentationControls, Preload } from '@react-three/drei';
import { threeAssetUrls, threeAssetMetadata } from '../config/threeAssets';

// Precarica il modello con l'URL centralizzato
useGLTF.preload(threeAssetUrls.phone);

function PhoneModel({ onLoad }) {
  const { scene } = useGLTF(threeAssetUrls.phone, true);
  const meshRef = useRef();

  useEffect(() => { if (scene && onLoad) onLoad(); }, [scene, onLoad]);
  if (!scene) return null;

  useFrame((state) => { if (meshRef.current) meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; });

  return (
    <primitive ref={meshRef} object={scene} position={[0,0,0]} rotation={[0,0,0]} scale={threeAssetMetadata.phone.scale} />
  );
}

function Phone3D() {
  const [isLoaded, setIsLoaded] = useState(false);
  const frameLoop = import.meta.env && import.meta.env.DEV ? 'always' : 'demand';

  return (
    <Suspense fallback={null}>
      <Canvas
        frameloop={frameLoop}
        dpr={[1, 1.5]}
        camera={{ position: threeAssetMetadata.phone.cameraPosition, fov: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false, preserveDrawingBuffer: false }}
        onContextLost={(e) => { e.preventDefault(); }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Environment preset="studio" />
        <PresentationControls global rotation={[0,0,0]} polar={[-Math.PI/3, Math.PI/3]} azimuth={[-Math.PI/1.4, Math.PI/1.4]}>
          <PhoneModel onLoad={() => setIsLoaded(true)} />
        </PresentationControls>
        <OrbitControls enableZoom enableRotate enablePan={false} autoRotate autoRotateSpeed={threeAssetMetadata.phone.autoRotateSpeed} minDistance={threeAssetMetadata.phone.minDistance} maxDistance={threeAssetMetadata.phone.maxDistance} />
        <Preload all />
      </Canvas>
    </Suspense>
  );
}

export default Phone3D;
```

---
### 4) Gestione StrictMode per evitare schermi bianchi in sviluppo
Evita il double-mount di React 18 in dev che può causare perdita del contesto WebGL.
```javascript
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const Root = import.meta.env && import.meta.env.DEV
  ? <App />
  : (
      <StrictMode>
        <App />
      </StrictMode>
    );

createRoot(document.getElementById('root')).render(Root)
```

---
### 5) Linee guida Canvas
- In dev usa `frameloop="always"`; in prod `"demand"` per performance.
- Aggiungi `onContextLost={(e) => e.preventDefault()}` al `<Canvas>`.
- Aggiungi `<Preload all />` per sincronizzare la cache di drei con i modelli.

---
### 6) Troubleshooting
- Schermo bianco dopo la prima navigazione:
  - Disattiva StrictMode in dev come sopra; usa `frameloop="always"`.
  - Verifica che i GLB siano importati da `src/assets/3D/` e non serviti da `public/`.
- Modello non visibile al primo load:
  - Controlla che `useGLTF.preload(url)` sia chiamato e che l’URL provenga da `threeAssets.js`.
- Warning "Context Lost":
  - Aggiungi `onContextLost` al `<Canvas>` e riduci `dpr`.

---
### 7) Checklist “Done”
- [ ] GLB copiati in `src/assets/3D/`
- [ ] Creato `threeAssets.js` con URL e metadati
- [ ] Hook `useResourcePreloader` integrato (opzionale ma consigliato)
- [ ] Componenti 3D usano `threeAssetUrls` e `<Preload all />`
- [ ] `Canvas` ha `onContextLost` e frameloop dinamico dev/prod
- [ ] StrictMode attivo solo in produzione

Seguendo alla lettera questo playbook, l’implementazione 3D risulterà identica e funzionante in qualsiasi progetto React moderno.
