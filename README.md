# Jader Daniotti - Portfolio Website

Portfolio professionale di Jader Daniotti, Fullstack Developer specializzato in Frontend, UI/UX, Web Design e soluzioni digitali personalizzate.

## 🚀 Caratteristiche

- **Design Responsive**: Ottimizzato per desktop, tablet e mobile
- **Performance**: Build ottimizzato con Vite e code splitting
- **SEO Optimized**: Meta tags, structured data, sitemap e robots.txt
- **PWA Ready**: Manifest.json e service worker support
- **Animazioni**: GSAP, AOS e altre librerie per animazioni fluide
- **Accessibilità**: WCAG 2.1 compliant

## 🛠️ Tecnologie Utilizzate

### Frontend
- **React 19** - Framework principale
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Routing client-side

### Animazioni & UI
- **GSAP** - Animazioni avanzate
- **AOS** - Animazioni on scroll
- **Swiper** - Carousel e slider
- **React Fast Marquee** - Testo scorrevole
- **Typed.js** - Effetto typing

### SEO & Performance
- **Meta tags dinamici** - SEOHead component
- **Structured Data** - JSON-LD schema.org
- **Sitemap XML** - Automatico per tutti i percorsi
- **Robots.txt** - Configurazione completa
- **PWA Manifest** - Progressive Web App support

## 📁 Struttura del Progetto

```
Jader/
├── public/
│   ├── favicon.png
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── _redirects
│   └── immagini/
├── src/
│   ├── components/
│   │   ├── SEOHead.jsx
│   │   ├── bigButton.jsx
│   │   ├── cardAnteprimaProgetti.jsx
│   │   ├── cardServizi.jsx
│   │   └── skillSection.jsx
│   ├── pages/
│   │   ├── home.jsx
│   │   ├── chisono.jsx
│   │   ├── progetti.jsx
│   │   ├── competenze.jsx
│   │   ├── collaborazioni.jsx
│   │   ├── servizi.jsx
│   │   └── contatti.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── netlify.toml
└── package.json
```

## 🚀 Installazione e Sviluppo

### Prerequisiti
- Node.js 18+ 
- npm o yarn

### Installazione
```bash
# Clona il repository
git clone https://github.com/jaderdaniotti/portfolio.git
cd portfolio

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

### Script Disponibili
```bash
npm run dev          # Avvia server di sviluppo
npm run build        # Build per produzione
npm run preview      # Preview del build
npm run lint         # Esegue ESLint
```

## 🌐 Deployment

### Netlify (Raccomandato)
1. Push del codice su GitHub
2. Connessione con Netlify
3. Build settings automatici configurati
4. Deploy automatico ad ogni push

### Configurazione Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

### Variabili d'Ambiente
```env
NODE_VERSION=18
NPM_FLAGS=--legacy-peer-deps
```

## 📊 SEO Optimization

### Meta Tags
Ogni pagina include meta tags dinamici tramite il componente `SEOHead`:
- Title ottimizzato per ogni pagina
- Description specifica per contenuto
- Keywords rilevanti
- Open Graph e Twitter Cards

### Structured Data
- **Person Schema**: Informazioni su Jader Daniotti
- **Organization Schema**: Portfolio come organizzazione
- **WebSite Schema**: Informazioni sul sito web

### Performance
- **Code Splitting**: Chunk separati per vendor, router, animazioni
- **Image Optimization**: Preload per immagini critiche
- **Lazy Loading**: Componenti caricati on-demand
- **Bundle Analysis**: Ottimizzazione automatica

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🔧 Configurazione SEO

### Sitemap
```xml
<!-- public/sitemap.xml -->
- Homepage: Priority 1.0
- Progetti: Priority 0.9
- Altre pagine: Priority 0.7-0.8
```

### Robots.txt
```txt
User-agent: *
Allow: /
Sitemap: https://jaderdaniotti.netlify.app/sitemap.xml
```

### Manifest.json
```json
{
  "name": "Jader Daniotti Portfolio",
  "short_name": "Jader Portfolio",
  "display": "standalone",
  "theme_color": "#ffffff"
}
```

## 📱 PWA Features

- **Installable**: Può essere installato come app
- **Offline Ready**: Service worker per cache
- **App-like Experience**: Fullscreen e standalone mode
- **Shortcuts**: Accesso rapido a progetti e contatti

## 🔍 Analytics e Monitoring

### Google Analytics
```javascript
// Implementazione GA4
gtag('config', 'GA_MEASUREMENT_ID');
```

### Performance Monitoring
- **Lighthouse CI**: Test automatici
- **Web Vitals**: Monitoraggio Core Web Vitals
- **Error Tracking**: Sentry o simili

## 🚀 Best Practices Implementate

### Performance
- ✅ Code splitting automatico
- ✅ Lazy loading componenti
- ✅ Image optimization
- ✅ Critical CSS inlining
- ✅ Gzip compression

### SEO
- ✅ Meta tags dinamici
- ✅ Structured data
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Open Graph tags

### Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast compliance

### Security
- ✅ HTTPS enforcement
- ✅ Security headers
- ✅ CSP implementation
- ✅ XSS protection
- ✅ Content type sniffing prevention

## 📈 Metriche SEO

### Pre-Deployment
- **Lighthouse Score**: 95+ su tutti i criteri
- **PageSpeed Insights**: 90+ mobile/desktop
- **GTmetrix**: A+ rating
- **WebPageTest**: First Contentful Paint < 1.5s

### Post-Deployment
- **Google Search Console**: Indexing status
- **Google Analytics**: User engagement
- **Core Web Vitals**: Real user data
- **Search Rankings**: Keyword positions

## 🔄 Aggiornamenti e Manutenzione

### SEO Maintenance
- Aggiornamento sitemap mensile
- Review meta tags trimestrale
- Performance audit bimestrale
- Content refresh periodico

### Technical Updates
- Dependency updates mensili
- Security patches immediati
- Performance optimizations continue
- Feature additions pianificate

## 📞 Supporto

Per domande o supporto:
- **Email**: jaderdaniotti.lavoro@gmail.com
- **LinkedIn**: [Jader Daniotti](https://www.linkedin.com/in/jader-daniotti-0a00b9328/)
- **GitHub**: [jaderdaniotti](https://github.com/jaderdaniotti)

## 📄 Licenza

Questo progetto è di proprietà di Jader Daniotti. Tutti i diritti riservati.

---

**Ultimo aggiornamento**: Dicembre 2024
**Versione**: 2.0.0
**Status**: Production Ready ✅

---

## 🎯 3D Components: Architettura, Caricamento e Fix del Primo Load

Questo capitolo spiega in modo chiaro per Project Manager e Dev come funzionano i componenti 3D (Phone, Mouse, Laptop), come avviene il loro caricamento, perché al primo caricamento a volte non compaiono e cosa fare per risolvere definitivamente.

### Stack 3D in breve
- **React Three Fiber (R3F)**: renderer React per Three.js (`<Canvas />`, `useFrame`).
- **drei**: utility e helpers (es. `useGLTF`, `OrbitControls`, `Environment`, `PresentationControls`).
- **Modelli GLB**: caricati via `useGLTF` con caching interno di drei.

### Dove sono i componenti 3D
- `src/components/Phone3D.jsx`
- `src/components/Mouse3D.jsx`
- `src/components/Laptop3D.jsx`

Struttura comune:
- Precaricamento modello via `useGLTF.preload(...)` a livello modulo.
- `Model` che usa `useGLTF(url, true)` e applica piccole ottimizzazioni (bounding, shadows, rotazione in `useFrame`).
- `Canvas` con luci di base, `Environment`, `PresentationControls` e `OrbitControls`.
- `Suspense` con fallback, `ErrorBoundary` e fallback semplice in caso di errore/timeout.

### Come avviene oggi il caricamento
1. In `home.jsx` viene usato l'hook `useResourcePreloader` per mostrare una barra di “preparazione modelli 3D”.
2. L’hook esegue `useGLTF.preload(resource.url)` usando URL assoluti in `/assets/3D/...` (cartella pubblica).
3. I componenti 3D invece importano i GLB da `src/assets/3D/...` (import Vite che produce URL bundlati e hashati in build) e poi chiamano `useGLTF(importUrl, true)`.
4. Si renderizza `<Canvas>` con `Suspense`: quando il modello è davvero pronto, appare la scena; in caso contrario, si vede il fallback.

### Perché al primo load può non funzionare (sintomi riportati)
- Al primo caricamento della Home, a volte i modelli 3D non compaiono; cambiando pagina e tornando, funzionano; con reload, di nuovo problemi.

Cause principali individuate:
- **Cache disallineata (URL diversi)**: il preloader usa path pubblici (`/assets/3D/...`), i componenti usano URL generati dal bundler (import da `src/assets/...`). Il caching di `useGLTF` è per-URL, quindi il “precarico” non serve ai componenti (due URL diversi ⇒ due cache diverse ⇒ doppio fetch, timing e race conditions).
- **StrictMode in sviluppo**: React 18 StrictMode ri-monta i componenti in dev, quindi il Canvas/renderer può inizializzarsi due volte. Con `frameloop="demand"` e carichi concorrenti, può sembrare che non parta finché non si cambia route.
- **Preloader non attende realmente i GLB**: `useGLTF.preload` attiva il loader interno, ma l’hook attuale risolve la Promise subito dopo la chiamata, quindi la UI di “preparazione” può chiudersi prima che i GLB siano in cache per i componenti.
- **Percorsi e duplicazione asset**: GLB presenti sia in `public/assets/3D` che in `src/assets/3D`. Se si mescolano approcci (public URL vs import Vite), si perde il beneficio del caching condiviso.

### Effetti collaterali osservabili
- Fallback che rimane visibile al primo load; al cambio pagina/tornando, il modello appare.
- Reload che fa perdere lo stato della cache di drei su alcuni URL, riproponendo il problema.

### Linee guida per una soluzione stabile
1. **Unificare le sorgenti dei GLB**
   - Scegliere un SOLO modo di risolvere i GLB: o tutti via `import` (Vite) o tutti via `public/` path assoluti. Consigliato: via `import`, perché:
     - URL unici e cacheable dal bundler
     - hashing in produzione
     - referenze consistenti in tutto il codice

2. **Allineare il Preloader agli stessi URL dei componenti**
   - Esportare gli URL dei modelli da un modulo condiviso e riusarli sia nel preloader sia nei componenti 3D.

3. **Usare `<Preload all />` dentro ogni `<Canvas>`**
   - Componente di drei che garantisce il prefetch delle risorse usate nella scena prima del render finale.

4. **Evitare StrictMode-only glitches in dev**
   - In sviluppo, StrictMode ri-monta; per verificare, si può temporaneamente rimuovere StrictMode o passare `frameloop="always"` per debugging, poi ripristinare `demand` con invalidazioni gestite da `useFrame`/autoRotate.

5. **Non duplicare GLB tra `public/` e `src/`**
   - Tenere i modelli in `src/assets/3D` e rimuovere le copie da `public/` (o viceversa) per evitare incongruenze.

### Modello di implementazione consigliato

1) Creare una mappa centralizzata degli asset 3D (stessi URL ovunque):

```javascript
// src/config/threeAssets.js
import phoneModelUrl from '../assets/3D/apple_iphone_15_pro_max_black.glb';
import mouseModelUrl from '../assets/3D/computer_mouse_a4tech_bloody_v7.glb';
import laptopModelUrl from '../assets/3D/laptop.glb';

export const threeAssetUrls = {
  phone: phoneModelUrl,
  mouse: mouseModelUrl,
  laptop: laptopModelUrl,
};
```

2) Usare questi URL sia nel preloader che nei componenti 3D:

```javascript
// src/hooks/useResourcePreloader.js (estratto)
import { threeAssetUrls } from '../config/threeAssets';
import { useGLTF } from '@react-three/drei';

// Esempio: precarica esplicitamente gli stessi URL
useGLTF.preload(threeAssetUrls.phone);
useGLTF.preload(threeAssetUrls.mouse);
useGLTF.preload(threeAssetUrls.laptop);
```

```javascript
// src/components/Phone3D.jsx (estratto)
import { threeAssetUrls } from '../config/threeAssets';
useGLTF.preload(threeAssetUrls.phone);
const { scene } = useGLTF(threeAssetUrls.phone, true);
```

3) Aggiungere `<Preload all />` nel Canvas:

```jsx
import { Preload } from '@react-three/drei';

<Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 3], fov: 100 }}>
  {/* luci, controls, ecc. */}
  <Preload all />
</Canvas>
```

4) Semplificare il preloader pagina per i GLB
- Opzione A: lasciare solo il preloader immagini/font nell’hook e affidare il preload dei GLB a: `useGLTF.preload(...)` + `<Preload all />`.
- Opzione B: se si vuole mostrare progress reale dei GLB, usare il `useProgress` di drei al posto di simulazioni.

### Check-list rapida per la correzione
- [ ] Creata `src/config/threeAssets.js` con gli import Vite dei 3 GLB.
- [ ] Aggiornati `Phone3D.jsx`, `Mouse3D.jsx`, `Laptop3D.jsx` a usare gli stessi URL da `threeAssetUrls` (sia per `preload` che per `useGLTF`).
- [ ] Aggiornato `useResourcePreloader` per non usare `/assets/3D/...` assoluti; opzionalmente rimosso il precaricamento GLB da lì.
- [ ] Aggiunto `<Preload all />` dentro i `<Canvas>`.
- [ ] Rimosse copie duplicate dei GLB da `public/` (se si scelgono asset in `src/`).
- [ ] Testato in dev con/ senza StrictMode per escludere glitch di doppio mount.

### Effetto dei fix
- Il pre-caricamento sarà coerente e realmente efficace (stessa chiave URL ⇒ cache condivisa).
- I modelli compariranno correttamente al primo load della Home senza dover cambiare pagina.
- Il reload non romperà più la visualizzazione (cache e pipeline di caricamento allineate).

### Nota sulle performance
- `frameloop="demand"` è ideale per risparmiare CPU/GPU. Con rotazioni animate via `useFrame`, la scena invalida i frame correttamente.
- Tenere `dpr` massimo a 1.5, evitare shadow map pesanti e texture enormi.

