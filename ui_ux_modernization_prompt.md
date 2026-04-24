# Prompt Architettura UI/UX & Design Moderno per Portfolio 

Copia e incolla questo documento a Cursor per fornire un contesto stilistico, gerarchico e visivo perfetto su come strutturare l'interfaccia nel processo di refactoring in Next.js (o in React). Questo deve fungere da vera e propria "Bibbia Visiva" per la stesura del CSS e dei componenti.

---

## Obiettivo del Design
Vogliamo modernizzare un portfolio attualmente basato su tonalità prugna scuro (`#393053`) transizionando l'intera UI verso uno standard "Premium SaaS / Creative Dev 2024+". Il sito deve emanare forte padronanza tecnica e un'eccellente percezione estetica. Nessun componente standard: tutto deve sembrare organico, immersivo e disegnato su misura sfruttando Tailwind CSS v4, Framer Motion (o GSAP), e Three.js.

## 1. Palette Colori e Illuminazione
L'approccio deve essere **Deep Dark Mode**. Invece dei grigi piatti:
- **Background Globale (Base):** Scurissimo, con leggere tinte blu/viola (es. `zinc-950` o un custom `#0a0910`). Nessun grigio chiaro nelle sezioni principali a meno che non sia per forte contrasto narrativo.
- **Surface / Card Backgrounds:** Evitare il colore solido. Usa sfondi semi-trasparenti: `bg-white/[0.03]` o nero assoluto alleggerito da `backdrop-blur-xl`.
- **Primary & Accent (Glows):** Usa gradienti molto saturi come "Fluo Purple" in miscela con "Cyan" o "Magenta". Questi colori non faranno da sfondo ai bottoni, ma fungeranno da *illuminazione d'ambiente* (mesh gradients animati, leggeri glow sottoelavati dalle carte, text-gradients fluidi sui titoli H1).
- **Testi:** Non usare il bianco puro (`#FFFFFF`). Piuttosto virare su un bianco spaccato `text-white/90` per i titoli e `text-white/60` (es. `zinc-400`) per la lettura lunga (minore stanchezza oculare).

## 2. Layouts Visivi: Il Sistema "Bento"
Abbandoniamo le "griglie fisse a quadretti uguali" delle carte tradizionali.
- **Griglie Asimmetriche:** Le sezioni *Competenze*, *Progetti* e *Informazioni (Chi Sono)* andranno impaginate sfruttando i Bento Box (stile Apple). Rettangoli larghi e stretti, alternati a blocchi quadrati immensi, in cui l'immagine o il contenuto "esce fuori dal riquadro" o rimane al margine netto.
- **Bordi Premium:** Ogni card in stile Bento userà un bordo sottilissimo (es: `border border-white/10`) racchiudendole all'interno e dando l'idea di pannelli di vetro sollevati. Per l'hover, accentua leggermente il colore del bordo con una transizione a un gradient.

## 3. Gestione Tipografica "Scale and Contrast"
La tipografia deve fare da padrona laddove mancano immagini. 
- **Hero Typography:** Il font principale (es: *Geist*, *Inter* o i display fonts *Horizon*) dev'essere gigante. Imponiti usando `text-7xl` o `text-9xl` per la parola "Developer" o "Jader". Usa il tracking serrato (`tracking-tighter`) per dare compattezza "editorial" ai titoli moderni.
- **Gerarchia:** Assicurati che lo scarto dimensionale tra l'H1 e il paragrafo di corpo (body text) sia drammatico. Titoli immensi e paragrafi bilanciati (minimo `text-lg` per facile leggibilità), senza step intermedi confusi.

## 4. Esperienza e "Micro-Interazioni"
Il sito non deve apparire statico neanche per mezzo secondo.
- **Bordi Illuminati su Hover (Spotlight effect):** Per i componenti Cursor, inserisci script che ricreano il bagliore del cursore *sui bordi geometrici* delle carte su cui passi sopra. Questo fa levitare all'istante l'apparente complessità d'ingegneria UI del sito.
- **Magnetic Buttons:** Ogni CTA grossa o icona social deve resistere all'attrito e farsi tirare dal cursore (effetto magnete su mousemove) per conferire "peso" digitale all'interfaccia.
- **Blob Cursor / Follower:** Sostituire il cursore di base nei desktop con un cursore personalizzato, rotondo in blending mode (`mix-blend-difference`) che permette di invertire fisicamente il colore degli elementi testuali sotto di esso.
- **Scroll Telling:** Lenis genererà lo smooth scrolling, ma Cursor dovrà abbinare a questo transizioni `stagger` degli ingressi testuali e sezioni bloccate (pinning) che appaiono in sticky cross-fading via scroll.

## 5. Profondità dei Modelli 3D e Z-Index
Hai introdotto tecnologie come `@react-three/fiber` (es: Mano Robotica). 
- **Non inscatolarlo:** L'elemento 3D non deve più figurare all'interno di un quadrato divisorio standard. Fallo galleggiare dietro o _attraverso_ il testo, mascherato assieme alla tipografia. Ad esempio, potresti mettere il Canvas 3D in `fixed` sul lato destro, per permettergli di reagire col movimento del layout alle varie scroll positions.

## Riassunto Linee Guida per Cursor (Developer Task):
"*Caro Cursor, per ogni componente che genererai d'ora in avanti tieni rigorosamente a mente la regola 'Bento & Glass'. Cerca di avvolgere i raggruppamenti in griglie in stile masonry. Quando applichi sfondi, ignora i background solidi standard in favore di sfumature `bg-white/[0.04]` racchiuse da `border-white/10`. Se implementi Hover Effects, pensa ai gradient radiali sotterranei e transizioni molto lunghe (`duration-500 ease-out`). Metti forte enfasi su padding abbondanti (es. `p-8` e `p-12`) per dare un look molto arioso ed enterprise.*"
