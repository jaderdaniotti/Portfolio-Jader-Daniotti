import { useResourcePreloader } from '../hooks/useResourcePreloader';
import { getAllResourcesOrdered } from '../config/resources';
import caduta from '../../immagini/caduta.png'

const GlobalLoader = ({ onLoadingComplete }) => {
    // Ottiene tutte le risorse ordinate per priorità
    const resources = getAllResourcesOrdered();
    
    const { loading} = useResourcePreloader(resources);

    // Quando il loading è completato, chiama la callback
    if (!loading && onLoadingComplete) {
        setTimeout(() => {
            onLoadingComplete();
        }, 100);
    }

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 bg-scuro flex flex-col items-center justify-center">
            {/* Logo centrale con animazione */}
            <div className="p-20 animazioneloader">
                <img 
                    src={caduta} 
                    alt="Logo" 
                    className="object-contain"
                />
            </div>

            {/* Barra di progresso animata */}
            {/* <div className="w-80 md:w-96 bg-scuro-2 rounded-full h-3 mb-4 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                    style={{ width: `${progress}%` }}
                ></div>
            </div> */}

            {/* Testo di progresso */}
            {/* <div className="text-center">
                <p className="text-white text-lg mb-2 font-semibold">
                    {Math.round(progress)}%
                </p>
                <p className="text-gray-300 text-sm max-w-md px-4">
                    {currentResource || 'Inizializzazione...'}
                </p>
            </div> */}

            {/* Testo di benvenuto */}
            {/* <div className="mt-8 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-pulse">
                    Benvenuto nel mio Portfolio
                </h1>
                <p className="text-gray-300 text-sm">
                    Caricamento in corso...
                </p>
            </div> */}

            {/* Indicatore di caricamento aggiuntivo */}
            {/* <div className="mt-6 flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div> */}
        </div>
    );
};

export default GlobalLoader;
