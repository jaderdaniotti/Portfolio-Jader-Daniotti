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

function Work() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
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

    // Flow del processo di creazione sito
    const processSteps = [
        {
            step: 1,
            title: "Contatto Iniziale",
            description: "Mi contatti tramite WhatsApp, email o social per discutere delle tue esigenze",
            icon: Phone,
        },
        {
            step: 2,
            title: "Consulenza Gratuita",
            description: "Analizziamo insieme le tue necessità e definiamo gli obiettivi del progetto",
            icon: Headset,
        },
        {
            step: 3,
            title: "Scelta Template",
            description: "Scegli tra i template disponibili o opta per una soluzione completamente personalizzata",
            icon: Layout,
        },
        {
            step: 4,
            title: "Personalizzazione",
            description: "Adattiamo il design ai tuoi colori, logo e contenuti specifici",
            icon: Palette,
        },
        {
            step: 5,
            title: "Sviluppo",
            description: "Creiamo il sito con le tecnologie più moderne e ottimizzazioni SEO",
            icon: Code,
        },
        {
            step: 6,
            title: "Dominio e Hosting",
            description: "Configuriamo il dominio personalizzato e l'hosting per il tuo sito",
            icon: Globe,
        },
        {
            step: 7,
            title: "Test e Ottimizzazione",
            description: "Testiamo tutto su diversi dispositivi e ottimizziamo le performance",
            icon: CheckCircle,
        },
        {
            step: 8,
            title: "Consegna",
            description: "Il tuo sito è pronto! Ti forniamo tutte le credenziali e la documentazione",
            icon: Rocket,
        }
    ];

    return (
        <>
            <SEOHead
                title="Work - Jader Daniotti | Processo di Creazione Siti Web"
                description="Scopri il processo completo per la creazione del tuo sito web: dal primo contatto alla consegna finale. Sfoglia i template disponibili e scegli quello perfetto per te."
                keywords="processo creazione sito, template web, sviluppo sito, personalizzazione sito, dominio hosting"
            />
            <Navbar />

            {/* Hero Section */}
            <div className="py-10 ">
                <h1 className="text-center text-6xl md:text-8xl tracking-tight titolo-bianco">
                    WORK
                </h1>
            </div>
            <hr />

            {/* Sezione 1: Flow del Processo */}
            <section className="py-16 ">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-xl px-10 md:px-20 md:text-4xl mb-3 font-bold text-bianco tracking-tight text-center">
                            Il Processo
                        </h2>
                        <p className="text-xl font-semibold md:text-2xl text-bianco max-w-3xl mx-auto">
                            Dal primo contatto alla consegna finale, ecco come lavoriamo insieme per creare il tuo sito perfetto
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ">
                        {processSteps.map((step) => (
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
                                        <h3 className="text-xl font-bold text-gray-100/90 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-bianco font-medium text-sm text-gray-100/90 leading-relaxed">
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
            <section className="py-16 bg-scuro">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold titolo-bianco mb-6">
                            Template Disponibili
                        </h2>
                        <p className="text-xl md:text-2xl text-bianco max-w-3xl mx-auto">
                            Scegli tra i nostri template predefiniti o personalizzali secondo le tue esigenze
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bianco"></div>
                            <p className="text-bianco text-xl mt-4">Caricamento templates...</p>
                        </div>
                    ) : (
                        <>
                            {/* Grid Templates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                                {currentTemplates.map((template, index) => (
                                    <div
                                        key={template.id}
                                        className="bg-chiaro rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        {template.cover_url && (
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={template.cover_url}
                                                    alt={template.name}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-scuro mb-3">
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
                                            <div className="flex gap-3">
                                                {template.site_url && (
                                                    <a
                                                        href={template.site_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-scuro text-bianco px-4 py-2 rounded-lg text-sm font-semibold hover:bg-scuro-2 transition-colors duration-300 flex items-center gap-2"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                        Anteprima
                                                    </a>
                                                )}
                                                <a
                                                    href="/contatti"
                                                    className="bg-chiaro-2 text-scuro px-4 py-2 rounded-lg text-sm font-semibold hover:bg-chiaro-3 transition-colors duration-300 flex items-center gap-2"
                                                >
                                                    <i className="bi bi-chat-dots"></i>
                                                    Richiedi
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Paginazione */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="bg-chiaro text-scuro px-4 py-2 rounded-lg font-semibold hover:bg-chiaro-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <i className="bi bi-chevron-left"></i>
                                    </button>

                                    <div className="flex gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${currentPage === page
                                                    ? 'bg-bianco text-scuro'
                                                    : 'bg-chiaro text-scuro hover:bg-chiaro-2'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="bg-chiaro text-scuro px-4 py-2 rounded-lg font-semibold hover:bg-chiaro-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </>
    );
}

export default Work;
