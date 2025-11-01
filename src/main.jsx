import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'aos/dist/aos.css'
import Aos from 'aos'

// Filtro globale per ignorare errori delle estensioni del browser e altri errori non critici
window.addEventListener('error', (event) => {
    const message = event.message || '';
    const source = event.filename || '';
    
    // Ignora errori delle estensioni del browser
    if (message.includes('semver') ||
        message.includes('chrome-extension') ||
        message.includes('moz-extension') ||
        message.includes('Invalid argument not valid semver') ||
        message.includes('react_devtools_backend')) {
        event.preventDefault();
        return false;
    }
    
    // Ignora errori cross-origin di Aurora.js (normali per iframe)
    if (source.includes('aurora.js') || source.includes('itsaurora.ai')) {
        if (message.includes('SecurityError') || 
            message.includes('Blocked a frame') ||
            message.includes('addEventListener')) {
            event.preventDefault();
            return false;
        }
    }
    
    // Ignora errori di Bing tracking e GTM (COEP - normali)
    if (source.includes('bat.bing.com') || 
        source.includes('134625931') ||
        source.includes('GTM-') ||
        source.includes('ns.html') ||
        message.includes('ERR_BLOCKED_BY_RESPONSE') ||
        message.includes('NotSameOriginAfterDefaultedToSameOriginByCoep') ||
        message.includes('Cannot read properties of undefined') ||
        message.includes("reading 'unshift'")) {
        event.preventDefault();
        return false;
    }
    
    // Ignora errori di reCAPTCHA (caricati da script esterni)
    if (source.includes('recaptcha') || source.includes('google.com/recaptcha')) {
        if (message.includes('401') || message.includes('Unauthorized')) {
            event.preventDefault();
            return false;
        }
    }
});

// Sopprimi warning non critici della console
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args.join(' ');
  
  // Ignora warning di Permissions-Policy non riconosciute
  if (message.includes('Permissions-Policy header') && 
      (message.includes('ambient-light-sensor') || message.includes('private-token'))) {
    return;
  }
  
  // Ignora warning di preload non usati (informativi, non critici)
  if (message.includes('was preloaded using link preload but not used')) {
    return;
  }
  
  // Ignora warning di Clarity multiple tags (probabilmente caricato esternamente)
  if (message.includes('Multiple Clarity tags') || message.includes('CL001')) {
    return;
  }
  
  // Ignora errori JSON parsing di Aurora.js (notification-check failed)
  if (message.includes('[aurora.js]') && 
      (message.includes('notification-check failed') || 
       message.includes('not valid JSON') ||
       message.includes('Unexpected token'))) {
    return;
  }
  
  // Mostra gli altri warning normalmente
  originalWarn.apply(console, args);
};

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
