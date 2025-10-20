import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'aos/dist/aos.css'
import Aos from 'aos'

// Filtro globale per ignorare errori delle estensioni del browser
window.addEventListener('error', (event) => {
    if (event.message && (
        event.message.includes('semver') ||
        event.message.includes('chrome-extension') ||
        event.message.includes('moz-extension') ||
        event.message.includes('Invalid argument not valid semver') ||
        event.message.includes('react_devtools_backend')
    )) {
        event.preventDefault();
        console.warn('Errore estensione browser ignorato:', event.message);
        return false;
    }
});

Aos.init();

// In sviluppo, evita React.StrictMode per prevenire mount/unmount doppi
// che possono causare perdita del contesto WebGL con più Canvas
const Root = import.meta.env && import.meta.env.DEV
  ? <App />
  : (
      <StrictMode>
        <App />
      </StrictMode>
    );

createRoot(document.getElementById('root')).render(Root)
