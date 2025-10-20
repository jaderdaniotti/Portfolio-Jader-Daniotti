import React from 'react';
import { Smartphone, Mouse, Laptop } from 'lucide-react';

// Componente di fallback semplice per i modelli 3D
function Simple3DFallback({ type = 'phone', title, description }) {
    const getIcon = () => {
        switch (type) {
            case 'phone':
                return <Smartphone className="w-16 h-16 text-scuro" />;
            case 'mouse':
                return <Mouse className="w-16 h-16 text-scuro" />;
            case 'laptop':
                return <Laptop className="w-16 h-16 text-scuro" />;
            default:
                return <Smartphone className="w-16 h-16 text-scuro" />;
        }
    };

    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-chalinro rounded-2xl p-8">
            <div className="text-center">
                <div className="mb-6 flex justify-center">
                    {getIcon()}
                </div>
                <h3 className="text-2xl font-bold text-scuro mb-4">{title}</h3>
                <p className="text-scuro text-lg mb-6">{description}</p>
                <div className="bg-scuro rounded-lg p-4 text-bianco">
                    <p className="text-sm">Modello 3D non disponibile</p>
                    <p className="text-xs opacity-75">Il tuo browser potrebbe non supportare WebGL</p>
                </div>
            </div>
        </div>
    );
}

export default Simple3DFallback;
