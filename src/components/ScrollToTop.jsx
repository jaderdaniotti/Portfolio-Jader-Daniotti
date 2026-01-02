import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente per gestire lo scroll automatico verso l'alto
 * quando si cambia pagina nel sito
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolla verso l'alto quando cambia il pathname
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Scroll fluido invece di istantaneo
    });
  }, [pathname]);

  return null; // Questo componente non renderizza nulla
}

export default ScrollToTop;
