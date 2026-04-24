# Prompt per Migrazione a Next.js (Portfolio & Blog SEO-Oriented)

Questo file contiene un prompt dettagliato pronto all'uso. Copia il testo presente nel box qui sotto e incollalo in una nuova conversazione con un'IA per iniziare lo sviluppo del tuo nuovo portfolio in Next.js.

---

**Contesto del Progetto:**
Voglio ricreare da zero il mio attuale portfolio (che attualmente è costruito con React, Vite, Tailwind CSS v4, Three.js, GSAP e Supabase). Il framework bersaglio sarà **Next.js (App Router)**. L'obiettivo è mantenere l'identità di "sito vetrina" (showcase e portfolio premium), ma portarlo allo step successivo rivoluzionando le performance e, in primis, la **SEO**. Per aumentare enormemente il traffico, voglio affiancare alla vetrina una sezione "Blog/Insights" ricca di pagine. L'attuale codice sorgente NON deve essere toccato; partiamo con una codebase totalmente nuova.

**1. Architettura e Tecnologie Richieste:**
- **Framework:** Next.js (ultima versione con App Router `app/`).
- **Styling:** Tailwind CSS integrato nativamente.
- **Animazioni:** Framer Motion e/o GSAP. Per lo scroll fluido usa Lenis (come nel mio stack attuale).
- **Sviluppo 3D:** Integrazione di `@react-three/fiber` e `@react-three/drei`. Questi componenti (come la mano robotica, effetti olovgrafici o particellari) dovranno essere marcati come "Client Components" (`"use client"`) e caricati dinamicamente (Lazy Load/`next/dynamic`) per non impattare sui tempi di caricamento (LCP) e sul punteggio SEO.
- **Backend/DB:** Supabase. La gestione dell'Auth, le fetch e le Server Actions sfrutteranno le API del server di Next.js (`@supabase/ssr`), per maggiore sicurezza e performance, sostituendo il vecchio fetching client-side globale.
- **Tipizzazione:** TypeScript (fortemente consigliato per azzerare bug invisibili).

**2. Obiettivi SEO e Struttura "Blog Scalabile":**
- **Punteggio Perfetto:** Il sito dovrà puntare a un 100/100 costante su Google Lighthouse su tutti i parametri.
- **Rendering Lato Server (SSR) e Pagine Statiche (SSG):** Massimizzare i Server Components. Le pagine del portfolio e gli articoli del blog devono essere staticamente generati a build time (`generateStaticParams`).
- **Metadata API:** Implementare le Metadata API native di Next.js per la generazione dinamica di Title, Description, Open Graph e Twitter Cards basati sui contenuti del database.
- **Dati Strutturati (Schema.org / JSON-LD):** Componenti dedicati per inserire JSON-LD nell'head di ogni pagina ("Person/LocalBusiness" sulla Index, "Article/BreadcrumbList" sul Blog).
- **Architettura Blog (SEO Core):** Voglio una nuova sezione `/blog` (o `/insights`) pensata per generare un alto volume di articoli SEO-friendly. Dovrà supportare: URL slug parlanti, categorie, articoli correlati. Si baserà su MDX (`next-mdx-remote`) o sui contenuti fetchati da Supabase.
- **SEO Automatica:** Route esclusive per generare dinamicamente `sitemap.xml` e `robots.txt` dal database dei post e dei progetti.

**3. UI/UX: Evoluzione Verso il "Premium":**
- **Mood Board:** "Moderno, Profondo, Vetrina d'Impatto". Voglio evolvere le mie attuali palette colore (come il color prugna scuro `--scuro-2` #393053) verso qualcosa di ancor più accattivante e contemporaneo: sfondi dark profondi (spingendo verso OLED black e dark violet/indigo) accesi da accenti luminosi neon (viola brillante, magenta e cyan gradient), ricalcando il filone visivo delle agenzie SaaS high-end (es. Vercel, Linear, Framer). 
- **Glassmorphism:** Esteso uso di effetti visivi `backdrop-blur` su header, dock bar e card. Bordi semitrasparenti in glow per restituire dimensione.
- **Layout:** Passare dalle card classiche a moderne griglie a bento-box dinamiche (stile Apple) per organizzare sezioni come "*Competenze*" e "*Collaborazioni*".
- **Font Optimization:** Integrare i font correnti o alternative moderne ad alta leggibilità e stile (come *Geist*, *Inter*, o i font *Horizon/Montserrat*) attraverso `next/font` per performance massime e zero fallbacks estetici (Niente Layout Shift).
- **Dettagli interattivi:** Animazioni di Reveal all'entrata in Viewport, micro-interazioni Magnetiche sui bottoni, blob animati sfocati in background e cursore blob personalizzato, eseguiti ottimizzando per i 60fps costanti.

**4. Mappa delle Pagine ed Ecosistema (Nuova Struttura `app/`):**
- `app/page.tsx`: Landing epica e vetrina principale. Hero a tutta pagina, snippet "Chi Sono", area 3D esplorabile (Lazy Loaded), evidenza dei progetti top, griglia Competenze a marquee e Bento-Box collaborazioni/partner.
- `app/progetti/page.tsx` & `[id]`: Lista progetti con filtri interattivi e pagina progetto altamente curata nel dettaglio (SSG+ISR).
- `app/blog/page.tsx` & `[slug]`: Index articoli in stile rivista tech e pagina di lettura perfetta (reading mode scuro impeccabile, syntax highlighting per codice, sidebar sticky con Table of Contents generato in automatico). Questa è la pagina che dovrà portarmi in vetta all'indicizzazione e attrarre utenti con guide tecniche.
- `app/admin/...`: Backend protetto e riservato con Next.js Middleware. Check token Supabase direttamente dal router.
- **Pagine Addizionali:** `app/chi-sono`, `app/contatti`, `app/servizi`.

**5. La TUA Prima Task (Step 1):**
Per favore, non scrivere tutto il codice in una volta, procediamo metodicamente. Come prima mossa, agendo come un Senior Next.js Developer orientato alla UX/SEO rispondimi generando nell'ordine:

1. **Il Comando di Setup Perfetto:** La scaletta dei comandi esatti (es. `npx create-next-app` con i flag consigliati e installazione dei principali pacchetti come `@supabase/ssr`, `framer-motion`, `lenis`, `@react-three/fiber`, ecc).
2. **Struttura Directory Verrà Creata:** L'albo ad albero visivo esatto (`app/`, `components/`, `lib/`, `hooks/`) da impostare in modo logico e mantenibile.
3. **App Architecture - `app/layout.tsx`:** Genera un codice d'esempio robusto per il RootLayout. Al suo interno devono esserci le impostazioni dei font ottimali (`next/font`), configurazione standard dei metatag SEO centralizzati (`viewport`, `metadata`), configurazione dark theme (se usi `next-themes`) e un setup per inizializzare il global smooth scrolling lenis che avvolge i page elements. 

Fornisci queste prime risposte e poi aspetterò prima del comando di costruire i componenti.
