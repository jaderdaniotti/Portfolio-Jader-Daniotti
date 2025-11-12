import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Preload } from '@react-three/drei';
import { threeAssetUrls, threeAssetMetadata } from '../config/threeAssets';

// Precarica il modello cyber core
useGLTF.preload(threeAssetUrls.sciFiRoom);

function SciFiRoomModel() {
    const { scene } = useGLTF(threeAssetUrls.sciFiRoom, true);
    const groupRef = useRef();

    useFrame((state) => {
        const container = groupRef.current;
        if (!container) return;
        // Rotazione leggera per dare vita alla scena
        container.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]} scale={threeAssetMetadata.sciFiRoom.scale}>
            {scene ? <primitive object={scene} /> : null}
        </group>
    );
}

const SciFiRoom3D = () => {
    const frameLoop = 'always';

    return (
        <div style={{ height: '100vh' }}>
            <h2 className='text-scuro hidden md:block md:text-9xl   font-extrabold  absolute  inter'>PANNELLO <br /> ADMIN</h2>
            <h2 className='text-scuro text-9xl block md:hidden  font-extrabold  absolute top-1/2 left-1/3 -translate-x-1/2  -rotate-90 z-[999] inter'>PANNELLO <br /> ADMIN</h2>
            <Suspense fallback={null}>
                <Canvas
                    frameloop={frameLoop}
                    dpr={[1, 1.5]}
                    camera={{ position: threeAssetMetadata.sciFiRoom.cameraPosition, fov: 100 }}
                    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false }}
                    onContextLost={(e) => { e.preventDefault(); }}
                >
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 8, 5]} intensity={1} />
                    <Environment preset="city" />
                    <SciFiRoomModel />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        autoRotate
                        autoRotateSpeed={5} // più basso = più lento
                        minDistance={threeAssetMetadata.sciFiRoom.minDistance}
                        maxDistance={threeAssetMetadata.sciFiRoom.maxDistance}
                    />
                    <Preload all />
                </Canvas>
            </Suspense>
        </div>
    );
};

export default SciFiRoom3D;


