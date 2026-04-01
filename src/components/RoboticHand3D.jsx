import React, { useRef, useState, Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, PresentationControls, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { threeAssetUrls, threeAssetMetadata } from '../config/threeAssets';
import { Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import Simple3DFallback from './Simple3DFallback';
import GlobalLoader from './GlobalLoader';

// Precarica il modello usando l'URL centralizzato
useGLTF.preload(threeAssetUrls.roboticHand);

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
        console.error('Errore nel componente 3D Robotic Hand:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorFallback error={this.state.error} />;
        }
        return this.props.children;
    }
}

// Componente per il modello Robotic Hand
function RoboticHandModel({ onLoad, isPlaying, onAnimationsReady }) {
    const { scene, animations } = useGLTF(threeAssetUrls.roboticHand, true);
    const { actions, mixer } = useAnimations(animations, scene);
    const meshRef = useRef();
    const groupRef = useRef();

    // Calcola il bounding box per centrare il modello
    const { center, scale } = useMemo(() => {
        if (!scene) return { center: [0, 0, 0], scale: threeAssetMetadata.roboticHand.scale };
        
        const box = new THREE.Box3().setFromObject(scene);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 3; // Dimensione target per il modello
        const calculatedScale = targetSize / maxDim;
        
        return {
            center: [-center.x, -center.y, -center.z],
            scale: [calculatedScale, calculatedScale, calculatedScale]
        };
    }, [scene]);

    // Gestisce le animazioni
    useEffect(() => {
        if (animations && animations.length > 0 && actions) {
            // Avvia tutte le animazioni
            Object.values(actions).forEach((action) => {
                if (action) {
                    action.reset().fadeIn(0.5).play();
                }
            });
            
            if (onAnimationsReady) {
                onAnimationsReady(true);
            }
        } else if (onAnimationsReady) {
            onAnimationsReady(false);
        }

        return () => {
            Object.values(actions).forEach((action) => {
                if (action) {
                    action.fadeOut(0.5);
                }
            });
        };
    }, [animations, actions, onAnimationsReady]);

    // Controlla play/pause delle animazioni
    useEffect(() => {
        if (mixer) {
            if (isPlaying) {
                mixer.timeScale = 1.0;
            } else {
                mixer.timeScale = 0.0;
            }
        }
    }, [isPlaying, mixer]);

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
            if (onLoad) onLoad();
        }
    }, [scene, onLoad]);

    if (!scene) return null;

    return (
        <group ref={groupRef} position={center}>
            <primitive 
                ref={meshRef}
                object={scene} 
                scale={scale}
            />
        </group>
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

// Componente principale della robotic hand 3D
function RoboticHand3D({ onAvailabilityChange }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [hasAnimations, setHasAnimations] = useState(false);

    // Verifica WebGL support
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) setHasError(true);
    }, []);

    useEffect(() => {
        if (!onAvailabilityChange) return;

        if (isLoaded) {
            onAvailabilityChange(true);
            return;
        }

        if (hasError || loadingTimeout) {
            onAvailabilityChange(false);
        }
    }, [isLoaded, hasError, loadingTimeout, onAvailabilityChange]);

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
                    type="hand"
                    title="Robotic Hand"
                    description="Modello 3D non disponibile - WebGL Context Lost"
                />
            </div>
        );
    }

    const frameLoop = 'always';

    return (
        <div 
            className="w-min-content h-min-content flex justify-center items-center z-[998] relative"
            style={{ touchAction: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
        >
            <ErrorBoundary fallback={<ErrorFallback />}>
                <Suspense fallback={<LoadingFallback />}>
                    <Canvas
                        frameloop={frameLoop}
                        style={{height: '100vh', width: '100vw', touchAction: 'none'}}
                        dpr={[1, 1.5]}
                        camera={{ position: threeAssetMetadata.roboticHand.cameraPosition, fov: 70 }}
                        gl={{
                            antialias: true,
                            alpha: true,
                            powerPreference: "high-performance",
                            failIfMajorPerformanceCaveat: false,
                            preserveDrawingBuffer: false,
                        }}
                        onContextLost={(e) => { e.preventDefault(); }}
                        onCreated={({ gl }) => {
                            gl.domElement.style.touchAction = 'none';
                        }}
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
                            cursor={true}
                            speed={1.5}
                            zoom={1}
                            config={{ mass: 2, tension: 200, friction: 50 }}
                            makeDefault={true}
                        >
                            <RoboticHandModel 
                                onLoad={() => setIsLoaded(true)} 
                                isPlaying={isPlaying}
                                onAnimationsReady={setHasAnimations}
                            />
                        </PresentationControls>
                        <Preload all />
                    </Canvas>
                </Suspense>
            </ErrorBoundary>
            
            {/* Barra di navigazione scroll helper - solo su schermi piccoli e medi */}
            {isLoaded && showContent && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-[999] pointer-events-none">
                    <div className="flex flex-col items-center gap-2 bg-scuro-2/80 backdrop-blur-sm rounded-r-full px-2 py-4 border-r-2 border-chiaro/30">
                        <button
                            onClick={() => {
                                window.scrollBy({ top: -200, behavior: 'smooth' });
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                window.scrollBy({ top: -200, behavior: 'smooth' });
                            }}
                            className="pointer-events-auto bg-chiaro/20 hover:bg-chiaro/40 text-bianco rounded-full p-2 transition-all duration-300 touch-manipulation"
                            style={{ touchAction: 'manipulation' }}
                            aria-label="Scroll su"
                        >
                            <ChevronUp className="w-6 h-6" />
                        </button>
                        <div className="h-[40vh] w-1 bg-chiaro/30 rounded-full"></div>
                        <button
                            onClick={() => {
                                window.scrollBy({ top: 200, behavior: 'smooth' });
                            }}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                window.scrollBy({ top: 200, behavior: 'smooth' });
                            }}
                            className="pointer-events-auto bg-chiaro/20 hover:bg-chiaro/40 text-bianco rounded-full p-2 transition-all duration-300 touch-manipulation"
                            style={{ touchAction: 'manipulation' }}
                            aria-label="Scroll giù"
                        >
                            <ChevronDown className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            {/* Pulsante Play/Pause */}
            {hasAnimations && isLoaded && showContent && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                    }}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="absolute bottom-8 right-8 z-[999] bg-chiaro hover:bg-chiaro/90 text-scuro rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                    aria-label={isPlaying ? 'Pausa animazione' : 'Riproduci animazione'}
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6" />
                    ) : (
                        <Play className="w-6 h-6" />
                    )}
                </button>
            )}
            
            {/* Overlay di caricamento */}
            {!isLoaded && !showContent && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <GlobalLoader/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RoboticHand3D;

