import Navbar from "../Navbar";
import Footer from "../Footer";
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';

function Chisono() {
    const timelineStops = [
        {
            number: "01",
            title: "Chi sono?",
            items: [
                "Ciao! Mi chiamo Jader e ti do il benvenuto sul mio sito web. Sono web designer a Udine, Gemona del Friuli, Solaro e in tutto il Friuli: mi occupo di creazione siti web su misura.",
                "Sono quel tipo di persona a cui piacciono le sfide, a cui piace imparare sempre cose nuove, prendendo spunto da ciò che lo circonda.",
                "Se sei arrivato in questa sezione del sito, vuol dire che non sei solo interessato al mio lato professionale, ma vuoi conoscermi davvero. Cercherò di farti avere un'idea più chiara di me!"
            ]
        },
        {
            number: "02",
            title: "La partenza",
            items: [
                "Ho cominciato il mio percorso alle superiori, in un CFP (Corso di Formazione Professionale), studiando come elettricista. A quell'età non avevo ancora in mente cosa volessi fare da grande. Volevo buttarmi nel mondo del lavoro, quindi decisi di fare 3 anni su 5 in alternanza scuola/lavoro.",
                "A 18 anni, nel 2019, stanco della vita che conducevo, mi venne offerta un'occasione d'oro: partire per lavorare in un altro stato, in compagnia di un amico.",
                "Senza pensarci troppo, dopo qualche settimana passata a organizzare i documenti, preparare i vestiti e salutare tutti, mi ritrovai in Francia, più precisamente a Fontaine, periferia di Grenoble, Rhone Alpes."
            ]
        },
        {
            number: "03",
            title: "Il lavoro",
            items: [
                "Durante i primi tempi in Francia, partendo da zero a livello linguistico, feci pratica lavorando nei mercati il weekend, attività che mi permise di imparare a parlare il francese pur continuando a vendere prodotti italiani. Dal lunedì al venerdì, invece, giravo le regioni limitrofe lavorando nei cantieri, alternando i ruoli di manovale e lavavetri.",
                "Al secondo anno, ebbi l'occasione di riprendere ciò che avevo studiato in Italia, ovvero l'elettricità. Venni assunto da un'azienda che forniva kit di impianti elettrici, imparando in seguito a lavorare anche su impianti di idraulica e riscaldamento.",
                "La mia carriera durò due anni, finché poi, dopo un'allettante offerta lavorativa, entrai in un'azienda leader nella realizzazione di mezzi di soccorso, tra cui ambulanze e veicoli per interventi dei pompieri. Con loro partii in trasferte, fino ad arrivare a gestire la manutenzione di queste ultime, anche in Romania."
            ]
        },
        {
            number: "04",
            title: "Dev-Mode",
            items: [
                "Dopo 5 anni, decisi di tornare in Italia, vicino alla mia famiglia e ai miei amici.",
                "Cominciai a lavorare in un'azienda come elettromeccanico, ma a settembre mi imbatto per puro caso in una pubblicità di un Bootcamp per diventare FullStack Developer.",
                "Ai tempi non avevo la più pallida idea di cosa significasse scrivere codice. Avevo creato un sito ecommerce qualche anno prima con Shopify seguendo tutorial su Youtube, ma non potevo nemmeno immaginare cosa sarebbe significato, di lì a qualche mese, saperlo fare scrivendo codice e personalizzando tutto dalla A alla Z.",
                "Decisi quindi di iscrivermi. Iniziai il corso a ottobre in orario part-time, la sera dopo il lavoro, finché non mi lasciai quest'ultimo a dicembre per dedicare l'intera giornata allo studio e alla pratica.",
                "In parallelo al corso, approfondisco gli argomenti trattati in autonomia, realizzo progetti di prova per esercitarmi e, occasionalmente, creo web app per privati o collaboro con amici alla realizzazione di progetti.",
                "Dopo vari progetti e tanti pezzi di me messi in progetti altrui, eccomi qui a costruire il sito che parla di me, Jader, per farti davvero capire chi sono."
            ]
        }
    ];

    return (
        <>
            <SEOHead 
                title="Chi Sono - Jader Daniotti | Web Designer Udine e Friuli"
                description="Jader Daniotti: web designer a Udine, Gemona del Friuli e Solaro. La mia storia da elettricista al Bootcamp FullStack. Creazione siti web in Friuli."
                keywords="jader daniotti, web designer udine, web designer friuli, chi sono, storia, FullStack Developer, creazione siti web udine, Gemona del Friuli, Solaro"
            />
            <Navbar />
            
            <PageHero
                eyebrow="IL PERCORSO"
                title="Jader"
                description="Una sequenza di soste pensata per far emergere il mio percorso con ritmo, scorci e tempo per vivere ogni luogo."
                keywords={["Web Designer", "Udine", "Friuli", "FullStack"]}
            />

            {/* Timeline */}
            <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-scuro-2">
                <div className="mx-auto max-w-6xl">
                    <ol className="relative mt-8 space-y-4 md:space-y-0 md:before:absolute md:before:bottom-0 md:before:left-1/2 md:before:top-0 md:before:w-px md:before:-translate-x-1/2 md:before:bg-white/12 md:before:content-['']">
                        {timelineStops.map((stop, si) => (
                            <li
                                key={`stop-${si}`}
                                data-aos="fade-up"
                                data-aos-delay={Math.min((si + 1) * 100, 500)}
                            >
                                <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)]">
                                    <div
                                        className={`border-y border-white/12 py-8 ${
                                            si % 2 === 0
                                                ? "md:col-start-1 md:row-start-1 md:pr-8 md:text-right"
                                                : "md:col-start-3 md:row-start-1 md:pl-8"
                                        }`}
                                    >
                                        <div className={`text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42 ${si % 2 === 0 ? 'md:text-right' : ''}`}>
                                            {stop.number}
                                        </div>
                                        <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white">
                                            {stop.title}
                                        </h3>
                                        <ul className="mt-3 space-y-3 text-sm md:text-base font-normal leading-relaxed text-white/72">
                                            {stop.items.map((line, li) => (
                                                <li key={li}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="relative hidden md:col-start-2 md:row-start-1 md:block">
                                        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/80 shadow-[0_0_0_8px_rgba(255,255,255,0.04)]" />
                                    </div>

                                    <div
                                        className={
                                            si % 2 === 0
                                                ? "hidden md:col-start-3 md:row-start-1 md:block"
                                                : "hidden md:col-start-1 md:row-start-1 md:block"
                                        }
                                        aria-hidden
                                    />
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <Footer />
        </>
    )
}
export default Chisono
