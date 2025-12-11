import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import SEOHead from '../components/SEOHead';
import { supabase } from '../config/supabase';
import {
    Phone,
    Headset,
    Layout,
    Palette,
    Code,
    Globe,
    CheckCircle,
    Rocket
} from 'lucide-react';
import BigButton from "../components/bigButton";
import GlobalLoader from "../components/GlobalLoader";
import Ribbons from "../components/Ribbons";

function Work() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('WEB');
    const templatesPerPage = 6;

    // Fetch templates dal database
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const { data, error } = await supabase
                    .from('templates')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setTemplates(data || []);
            } catch (error) {
                console.error('Errore nel caricamento templates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    // Calcola templates per pagina corrente
    const indexOfLastTemplate = currentPage * templatesPerPage;
    const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
    const currentTemplates = templates.slice(indexOfFirstTemplate, indexOfLastTemplate);
    const totalPages = Math.ceil(templates.length / templatesPerPage);

    // Processi separati per ogni categoria
    const processWeb = [
        {
            step: 1,
            title: "Contatto Iniziale",
            description: "Tramite WhatsApp, email o social per discutere delle tue esigenze web.",
            icon: Phone,
        },
        {
            step: 2,
            title: "Consulenza Gratuita",
            description: "Analizziamo insieme le tue necessità e definiamo gli obiettivi del sito web.",
            icon: Headset,
        },
        {
            step: 3,
            title: "Personalizzazione",
            description: "Adattiamo il design ai tuoi colori, logo e contenuti specifici.",
            icon: Palette,
        },
        {
            step: 4,
            title: "Sviluppo",
            description: "Creiamo il sito con le tecnologie più moderne e ottimizzazioni SEO.",
            icon: Code,
        },
        {
            step: 5,
            title: "Dominio e Hosting",
            description: "Configuriamo il dominio personalizzato e l'hosting per il tuo sito.",
            icon: Globe,
        },
        {
            step: 6,
            title: "Test e Ottimizzazione",
            description: "Testiamo tutto su diversi dispositivi e ottimizziamo le performance.",
            icon: CheckCircle,
        },
        {
            step: 7,
            title: "Consegna",
            description: "Il tuo sito è pronto! Ti forniamo tutte le credenziali e la documentazione.",
            icon: Rocket,
        }
    ];

    const processApp = [
        {
            step: 1,
            title: "Contatto Iniziale",
            description: "Mi contatti per discutere delle tue esigenze per l'app mobile.",
            icon: Phone,
        },
        {
            step: 2,
            title: "Consulenza Gratuita",
            description: "Analizziamo insieme le funzionalità e definiamo gli obiettivi dell'app.",
            icon: Headset,
        },
        {
            step: 3,
            title: "Progettazione UX/UI",
            description: "Creiamo wireframe e mockup per un'esperienza utente ottimale.",
            icon: Layout,
        },
        {
            step: 4,
            title: "Sviluppo App",
            description: "Sviluppiamo l'app con tecnologie come React Native.",
            icon: Code,
        },
        {
            step: 5,
            title: "Test e Debug",
            description: "Testiamo l'app su diversi dispositivi e risolviamo eventuali bug.",
            icon: CheckCircle,
        },
        {
            step: 6,
            title: "Pubblicazione",
            description: "Pubblichiamo l'app su App Store e Google Play Store.",
            icon: Rocket,
        }
    ];

    const processCrm = [
        {
            step: 1,
            title: "Contatto Iniziale",
            description: "Mi contatti per discutere delle tue esigenze di gestione clienti.",
            icon: Phone,
        },
        {
            step: 2,
            title: "Analisi Processi",
            description: "Analizziamo i tuoi processi aziendali e identificiamo le necessità.",
            icon: Headset,
        },
        {
            step: 3,
            title: "Progettazione Sistema",
            description: "Progettiamo l'architettura del CRM personalizzato per la tua azienda.",
            icon: Layout,
        },
        {
            step: 4,
            title: "Sviluppo CRM",
            description: "Sviluppiamo il sistema CRM con funzionalità avanzate.",
            icon: Code,
        },
        {
            step: 5,
            title: "Integrazione Dati",
            description: "Integriamo i dati esistenti e configuriamo le automazioni.",
            icon: Globe,
        },
        {
            step: 6,
            title: "Formazione e Supporto",
            description: "Formiamo il tuo team e forniamo supporto continuo.",
            icon: CheckCircle,
        },
        {
            step: 7,
            title: "Consegna",
            description: "Il tuo CRM è pronto! Ti forniamo accesso e documentazione completa.",
            icon: Rocket,
        }
    ];

    // Funzione per ottenere il processo attivo
    const getCurrentProcess = () => {
        switch (activeTab) {
            case 'WEB': return processWeb;
            case 'APP': return processApp;
            case 'CRM': return processCrm;
            default: return processWeb;
        }
    };

    return (
        <div className="relative">
            <SEOHead
                title="Work - Jader Daniotti | Processo di Creazione Siti Web"
                description="Scopri il processo completo per la creazione del tuo sito web: dal primo contatto alla consegna finale. Sfoglia i template disponibili e scegli quello perfetto per te."
                keywords="processo creazione sito, template web, sviluppo sito, personalizzazione sito, dominio hosting"
            />
                <Navbar />
                <Ribbons
                    baseThickness={30}
                    colors={['#ffffff', '#746a94', '#443C68', '#393053']}
                    offsetFactor={0.01}
                    opacity={0.7}
                    speedMultiplier={0.2}
                    maxAge={300}
                    enableFade={true}
                    enableShaderEffect={true}
                    zIndex={1}
                />
            {/* Hero Section */}
            <div className="py-10 ">
                <h1 className="text-center text-6xl md:text-8xl tracking-tight titolo-bianco">
                    WORK
                </h1>
            </div>
            <hr />

            {/* Sezione 1: Tab Processi */}
            <section className="py-16 ">
                <div className="container mx-auto px-6">
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-16">
                        <div className="bg-chiaro rounded-full p-2 flex gap-2">
                            {['WEB', 'APP', 'CRM'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${activeTab === tab
                                            ? 'bg-scuro text-bianco shadow-lg'
                                            : 'text-scuro hover:bg-chiaro-2'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Processo Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 max-w-7xl mx-auto">
                        {getCurrentProcess().map((step) => (
                            <div
                                key={step.step}
                                className="bg-gradient-chiaro rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-linear hover:scale-105 relative"
                            >
                                <div className="bg-scuro text-bianco size-10 rounded-lg flex items-center justify-center mx-auto mb-4 text-md font-normal absolute -top-2 -left-2 shadow-2xl border-2 border-chiaro">
                                    {step.step}
                                </div>

                                <div className="text-center">
                                    <div className={`bg-scuro w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                        <step.icon className="text-white text-2xl" size={24} />
                                    </div>

                                    <div className=" rounded-lg">
                                        <h3 className="text-3xl font-semibold text-gray-100/90 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-bianco font-normal text-lg  max-w-2/3 mx-auto text-gray-100/90 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <BigButton
                            text="Inizia"
                            href="/contatti"
                        />
                    </div>
                </div>
            </section>

            <hr />

            {/* Sezione 2: Templates */}
            <section className="py-16 ">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold titolo-bianco mb-6">
                            Templates Disponibili
                        </h2>
                        <p className="text-xl md:text-2xl text-bianco max-w-3xl mx-auto">
                            Scegli tra i nostri template predefiniti o personalizzali secondo le tue esigenze
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-16">
                            <GlobalLoader />
                        </div>
                    ) : (
                        <>
                            {/* Grid Templates */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                                {currentTemplates.map((template) => (
                                    <div
                                        key={template.id}
                                        className="bg-gradient-chiaro2 group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-linear hover:scale-102 relative border-3 border-chiaro/20"
                                    >
                                        {template.cover_url && (
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={template.cover_url}
                                                    alt={template.name}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <h3 className="text-2xl font-semibold text-bianco mb-3">
                                                {template.name}
                                            </h3>
                                            {template.tags && template.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {template.tags.map((tag, tagIndex) => (
                                                        <span
                                                            key={tagIndex}
                                                            className="bg-scuro text-bianco px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className=" duration-300">
                                                {template.site_url && (
                                                    <a
                                                        href={template.site_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-scuro-2 border-2 px-2 py-1 rounded-lg absolute top-1 right-1"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Paginazione */}
                            {totalPages > 1 && (
                                <div className="flex  sm:flex-row justify-center items-center gap-2 sm:gap-4 px-4">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="bg-chiaro text-scuro px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold transition-colors duration-300 text-sm sm:text-base"
                                    >
                                        <i className="bi bi-chevron-left"></i>
                                    </button>

                                    <div className="flex justify-center gap-1 sm:gap-2">
                                        {(() => {
                                            // Calcola le pagine da mostrare (sempre 3)
                                            let startPage = Math.max(1, currentPage - 1);
                                            let endPage = Math.min(totalPages, currentPage + 1);

                                            // Se siamo all'inizio, mostra le prime 3 pagine
                                            if (currentPage <= 2) {
                                                startPage = 1;
                                                endPage = Math.min(3, totalPages);
                                            }

                                            // Se siamo alla fine, mostra le ultime 3 pagine
                                            if (currentPage >= totalPages - 1) {
                                                startPage = Math.max(1, totalPages - 2);
                                                endPage = totalPages;
                                            }

                                            const pagesToShow = [];
                                            for (let i = startPage; i <= endPage; i++) {
                                                pagesToShow.push(i);
                                            }

                                            return pagesToShow.map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold transition-colors duration-300 text-sm sm:text-base ${currentPage === page
                                                        ? 'bg-bianco text-scuro'
                                                        : 'bg-chiaro text-scuro hover:bg-chiaro-2'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ));
                                        })()}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="bg-chiaro text-scuro px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold transition-colors duration-300 text-sm sm:text-base"
                                    >
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            )}

                            {/* Messaggio se non ci sono templates */}
                            {!loading && templates.length === 0 && (
                                <div className="text-center py-16">
                                    <i className="bi bi-layout-text-window text-6xl text-bianco mb-4"></i>
                                    <p className="text-bianco text-xl">Nessun template disponibile al momento</p>
                                    <p className="text-bianco text-sm mt-2">Contattaci per creare un template personalizzato</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Work;
