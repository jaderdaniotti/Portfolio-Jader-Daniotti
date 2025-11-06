import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import laptopModel from '../assets/3D/laptop.glb';
import { Laptop } from 'lucide-react';
import Simple3DFallback from './Simple3DFallback';

// Precarica il modello
useGLTF.preload(laptopModel);

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
        console.error('Errore nel componente 3D Laptop:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorFallback error={this.state.error} />;
        }
        return this.props.children;
    }
}

// Componente per il modello Laptop
function LaptopModel({ onLoad }) {
    const { scene } = useGLTF(laptopModel, true);
    const meshRef = useRef();

    useEffect(() => {
        if (scene && onLoad) onLoad();
    }, [scene, onLoad]);

    if (!scene) return null;
    
    // Rotazione automatica leggera
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
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
            scale={[0.065, 0.055, 0.065]}
        />
    );
}

// Componente di fallback per il caricamento
function LoadingFallback() {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center">
            <div className="text-center">
            </div>
        </div>
    );
}

// Componente di errore per il caricamento del modello
function ErrorFallback({ error }) {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center">
            <div className="text-center">
                <div className="text-scuro text-6xl mb-4"><Laptop /></div>
                <p className="text-scuro text-xl">Errore nel caricamento del laptop 3D</p>
                <p className="text-scuro text-sm mt-2">{error?.message || 'Errore sconosciuto'}</p>
            </div>
        </div>
    );
}

// Componente principale del laptop 3D
function Laptop3D() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [loadingTimeout, setLoadingTimeout] = useState(false);

    // Verifica WebGL support
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) setHasError(true);
    }, []);

    // Timeout per il caricamento
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isLoaded) {
                console.warn('Timeout nel caricamento del laptop 3D');
                setLoadingTimeout(true);
            }
        }, 10000); // 10 secondi di timeout

        return () => clearTimeout(timeout);
    }, [isLoaded]);

    // Se c'è un errore o timeout, mostra il fallback semplice
    if (hasError || loadingTimeout) {
        return (
            <Simple3DFallback 
                type="laptop"
                title="Laptop"
                description="Modello 3D non disponibile - WebGL Context Lost"
            />
        );
    }

    return (
        <div className="phone-3d-container">
            <ErrorBoundary fallback={<ErrorFallback />}>
                <Suspense fallback={<LoadingFallback />}>
                    <Canvas
                        frameloop="demand"
                        dpr={[1, 1.5]}
                        camera={{ position: [0, 0, 2.5], fov: 100 }}
                        gl={{
                            antialias: true,
                            alpha: true,
                            powerPreference: "high-performance",
                            failIfMajorPerformanceCaveat: false,
                            preserveDrawingBuffer: false,
                        }}
                    >
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />
                        <Environment preset="studio" />
                        <PresentationControls
                            global
                            rotation={[0, 0, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                        >
                            <LaptopModel onLoad={() => setIsLoaded(true)} />
                        </PresentationControls>
                        <OrbitControls
                            enableZoom
                            enableRotate
                            enablePan={false}
                            autoRotate
                            autoRotateSpeed={0.4}
                            minDistance={2}
                            maxDistance={5}
                        />
                    </Canvas>
                </Suspense>
            </ErrorBoundary>
            
            {/* Overlay di caricamento */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-scuro mb-4"></div>
                        <p className="text-scuro text-xl">Caricamento laptop 3D...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Laptop3D;
