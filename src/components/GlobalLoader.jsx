import { useResourcePreloader } from '../hooks/useResourcePreloader';

const GlobalLoader = ({ onLoadingComplete }) => {
    // Precarica automaticamente tutte le risorse
    const { loading } = useResourcePreloader();

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
            <div className="loader"></div>

         
        </div>
    );
};

export default GlobalLoader;
