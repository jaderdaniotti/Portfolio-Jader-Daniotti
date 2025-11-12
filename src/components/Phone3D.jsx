import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, PresentationControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { threeAssetUrls, threeAssetMetadata } from '../config/threeAssets';
import { Smartphone } from 'lucide-react';
import Simple3DFallback from './Simple3DFallback';

// Precarica il modello usando l'URL centralizzato
useGLTF.preload(threeAssetUrls.phone);

// Error Boundary semplice per React
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Errore nel componente 3D:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorFallback error={this.state.error} />;
        }
        return this.props.children;
    }
}

// Componente per il modello iPhone
function PhoneModel({ onLoad }) {
    const { scene } = useGLTF(threeAssetUrls.phone, true);
    const meshRef = useRef();

    useEffect(() => {
        if (scene && onLoad) onLoad();
    }, [scene, onLoad]);

    if (!scene) return null;
    
    // Rotazione automatica leggera
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    // Ottimizza il modello per le performance
    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Ottimizza la geometria
                    if (child.geometry) {
                        child.geometry.computeBoundingBox();
                        child.geometry.computeBoundingSphere();
                    }
                }
            });
        }
    }, [scene]);

    return (
        <primitive 
            ref={meshRef}
            object={scene} 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={threeAssetMetadata.phone.scale}
        />
    );
}

// Componente di fallback per il caricamento
function LoadingFallback() {
    return (
        <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-gradient-chiaro">
            <div className="text-center">
            </div>
        </div>
    );
}

// Componente di errore per il caricamento del modello
function ErrorFallback({ error }) {
    return (
        <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-gradient-chiaro">
            <div className="text-center">
                <div className="text-scuro text-6xl mb-4">⚠️</div>
                <p className="text-scuro text-xl">Errore nel caricamento del modello 3D</p>
                <p className="text-scuro text-sm mt-2">{error?.message || 'Errore sconosciuto'}</p>
            </div>
        </div>
    );
}

// Componente principale del telefono 3D
function Phone3D() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [debugInfo, setDebugInfo] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [showContent, setShowContent] = useState(false);

    // Verifica WebGL support
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) setHasError(true);
    }, []);

    // Timeout per il caricamento - più lungo per il primo caricamento
    useEffect(() => {
        const timeoutDuration = isInitialLoad ? 15000 : 10000; // 15s per primo caricamento, 10s per successivi
        const timeout = setTimeout(() => {
            if (!isLoaded && !hasError) {
                console.warn('Timeout nel caricamento del modello 3D');
                setLoadingTimeout(true);
            }
        }, timeoutDuration);

        return () => clearTimeout(timeout);
    }, [isLoaded, hasError, isInitialLoad]);

    // Reset del timeout quando il modello si carica
    useEffect(() => {
        if (isLoaded) {
            setIsInitialLoad(false);
            setLoadingTimeout(false);
            // Mostra il contenuto dopo un breve delay per evitare flickering
            const delay = isInitialLoad ? 500 : 0;
            setTimeout(() => setShowContent(true), delay);
        }
    }, [isLoaded, isInitialLoad]);

    // Mostra il contenuto dopo un tempo minimo anche se c'è un errore
    useEffect(() => {
        if (hasError || loadingTimeout) {
            const delay = isInitialLoad ? 1000 : 0;
            setTimeout(() => setShowContent(true), delay);
        }
    }, [hasError, loadingTimeout, isInitialLoad]);

    // Se c'è un errore o timeout, mostra il fallback semplice
    if ((hasError || loadingTimeout) && showContent) {
        return (
            <div className="phone-3d-container">
                <Simple3DFallback 
                    type="phone"
                    title="iPhone 15 Pro Max"
                    description="Modello 3D non disponibile - WebGL Context Lost"
                />
                {debugInfo.contextLost && (
                    <div className="mt-4 p-4 bg-scuro rounded-lg text-bianco text-sm">
                        <p><strong>Debug Info:</strong></p>
                        <p>Context Lost: {debugInfo.contextLostTime}</p>
                        <p>Retry Count: {debugInfo.retryCount || retryCount}</p>
                        <p>WebGL Support: {navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'}</p>
                    </div>
                )}
            </div>
        );
    }

    const frameLoop = 'always';

    return (
        <div className="phone-3d-container absolute z-[998]">
            <h2 className='titolo-bianco text-9xl   font-extrabold  absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 -rotate-90 z-[999] inter'>IPHONE</h2>
            <ErrorBoundary fallback={<ErrorFallback />}>
                <Suspense fallback={<LoadingFallback />}>
                    <Canvas
                        frameloop={frameLoop}
                        style={{height: '100vh', width: '100vw'}}
                        dpr={[1, 1.5]}
                        camera={{ position: threeAssetMetadata.phone.cameraPosition, fov: 100 }}
                        gl={{
                            antialias: true,
                            alpha: true,
                            powerPreference: "high-performance",
                            failIfMajorPerformanceCaveat: false,
                            preserveDrawingBuffer: false,
                        }}
                        onContextLost={(e) => { e.preventDefault(); }}
                    >
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />
                        <Environment preset="studio" />
                        <PresentationControls
                            global={false}
                            rotation={[0, 0, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                            snap={false}
                            enabled={true}
                        >
                            <PhoneModel onLoad={() => setIsLoaded(true)} />
                        </PresentationControls>
                        <Preload all />
                    </Canvas>
                </Suspense>
            </ErrorBoundary>
            
            {/* Overlay di caricamento */}
            {!isLoaded && !showContent && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-scuro mb-4"></div>
                        <p className="text-scuro text-xl">Caricamento modello 3D...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phone3D;
