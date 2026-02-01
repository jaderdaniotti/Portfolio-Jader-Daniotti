import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import Footer from "../Footer";
import SEOHead from '../components/SEOHead';
import { supabase } from '../config/supabase';
import {
    Monitor,
    Tablet,
    Smartphone,
    ArrowLeft,
    Code,
    FileText,
    Globe,
    Layers,
    Sparkles,
    ExternalLink,
    Image as ImageIcon,
    Database,
    Server,
    Palette,
    Calendar,
    Tag
} from 'lucide-react';
import GlobalLoader from '../components/GlobalLoader';

function ProgettoDettaglio() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [progetto, setProgetto] = useState(null);
    const [projectImages, setProjectImages] = useState({ pc: [], tablet: [], mobile: [] });
    const [projectTechnologies, setProjectTechnologies] = useState({ frontend: [], backend: [], database: [] });
    const [allTechnologies, setAllTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDeviceTab, setActiveDeviceTab] = useState('pc');

    useEffect(() => {
        const loadProjectDetails = async () => {
            try {
                setLoading(true);

                // 1. Carica i dati del progetto
                const { data: projectData, error: projectError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (projectError) throw projectError;
                setProgetto(projectData);

                // 2. Carica tutte le tecnologie disponibili
                const { data: technologiesData, error: technologiesError } = await supabase
                    .from('technologies')
                    .select('*')
                    .order('order_index');

                if (technologiesError) {
                    console.error('Errore nel caricamento tecnologie:', technologiesError);
                } else {
                    setAllTechnologies(technologiesData || []);
                }

                // 3. Carica le immagini del progetto
                const { data: imagesData, error: imagesError } = await supabase
                    .from('project_images')
                    .select('*')
                    .eq('project_id', id)
                    .order('order_index');

                if (imagesError) {
                    console.error('Errore nel caricamento immagini:', imagesError);
                } else {
                    // Organizza le immagini per device_type
                    const imagesByDevice = {
                        pc: [],
                        tablet: [],
                        mobile: []
                    };

                    (imagesData || []).forEach(img => {
                        if (img.device_type && imagesByDevice[img.device_type]) {
                            imagesByDevice[img.device_type].push({
                                id: img.id,
                                image_url: img.image_url,
                                order_index: img.order_index
                            });
                        }
                    });

                    setProjectImages(imagesByDevice);

                    // Imposta tab attiva di default al primo device disponibile
                    const firstAvailableDevice = ['pc', 'tablet', 'mobile'].find(
                        device => imagesByDevice[device] && imagesByDevice[device].length > 0
                    );
                    if (firstAvailableDevice) {
                        setActiveDeviceTab(firstAvailableDevice);
                    }
                }

                // 4. Carica le tecnologie del progetto
                const { data: projectTechsData, error: projectTechsError } = await supabase
                    .from('project_technologies')
                    .select('*')
                    .eq('project_id', id);

                if (projectTechsError) {
                    console.error('Errore nel caricamento tecnologie progetto:', projectTechsError);
                } else {
                    // Organizza le tecnologie per tipo
                    const technologiesByType = {
                        frontend: [],
                        backend: [],
                        database: []
                    };

                    (projectTechsData || []).forEach(pt => {
                        if (pt.type && technologiesByType[pt.type]) {
                            technologiesByType[pt.type].push(pt.technology_id);
                        }
                    });

                    setProjectTechnologies(technologiesByType);
                }
            } catch (error) {
                console.error('Errore nel caricamento dettagli progetto:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProjectDetails();
        }
    }, [id]);

    // Ottieni le tecnologie complete per tipo
    const getTechnologiesByType = (type) => {
        if (!projectTechnologies[type]) return [];
        return projectTechnologies[type]
            .map(techId => allTechnologies.find(t => t.id === techId))
            .filter(Boolean);
    };

    const frontendTechs = getTechnologiesByType('frontend');
    const backendTechs = getTechnologiesByType('backend');
    const databaseTechs = getTechnologiesByType('database');
    const currentImages = projectImages[activeDeviceTab] || [];

    if (loading) {
        return (
            <>
                <SEOHead
                    title="Caricamento Progetto - Jader Daniotti Portfolio"
                    description="Caricamento dettagli progetto..."
                />
                <Navbar />
                <div className="min-h-screen bg-scuro-2 flex flex-col items-center justify-center">
                    <GlobalLoader />
                </div>
                <Footer />
            </>
        );
    }

    if (!progetto) {
        return (
            <>
                <SEOHead
                    title="Progetto non trovato - Jader Daniotti Portfolio"
                    description="Il progetto richiesto non è stato trovato."
                />
                <Navbar />
                <div className="min-h-screen bg-scuro-2 flex flex-col items-center justify-center">
                    <h1 className="text-4xl text-bianco mb-4">Progetto non trovato</h1>
                    <button
                        onClick={() => navigate('/progetti')}
                        className="cta mx-auto w-auto"
                    >
                        <span className="span">Torna ai Progetti</span>
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <SEOHead
                title={`${progetto.title} - Jader Daniotti Portfolio`}
                description={progetto.description || `Dettagli del progetto ${progetto.title}`}
                keywords={`${progetto.title}, progetto web, sviluppo web, React, Laravel`}
            />
            <Navbar />

            <div className="min-h-screen bg-scuro-2 py-8 pt-20 md:pt-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                    {/* Header Section - Modern Card Design */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/progetti')}
                            className="group flex items-center gap-2 text-bianco hover:text-chiaro transition-all duration-300 mb-6 px-4 py-2 rounded-lg hover:bg-chiaro-2/20 backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            <span className="text-base font-medium">Torna ai Progetti</span>
                        </button>

                        <div className="">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-1">
                                    <h1 className="text-3xl md:text-5xl lg:text-8xl font-extrabold tracking-tighter text-bianco leading-tight">
                                        {progetto.title}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='my-8 ' />
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-center">
                        {/* Left Column - Description & Technologies */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Description Card */}
                            <div className="">
                                <div className="flex items-center gap-3 mb-4">
                                    
                                    <h2 className="text-3xl md:text-4xl font-bold text-bianco">Descrizione</h2>
                                </div>
                                <p className="text-base font-medium md:text-lg text-bianco/90 leading-relaxed">
                                    {progetto.description || 'Nessuna descrizione disponibile per questo progetto.'}
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Quick Actions & Info */}
                        <div className="space-y-6 ">
                            {/* Quick Actions Card */}
                            {progetto.domain_url ? (
                                <div className="glass rounded-xl p-6 border border-chiaro-2/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-chiaro-2 rounded-lg">
                                            <Globe className="w-5 h-5 text-bianco" />
                                        </div>
                                        <h3 className="text-xl font-bold text-bianco">Link Utili</h3>
                                    </div>
                                    <a
                                        href={progetto.domain_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cta w-full block text-center"
                                    >
                                        <span className="span">Visita il Sito</span>
                                        <span className="second">
                                            <svg
                                                width="50px"
                                                height="20px"
                                                viewBox="0 0 66 43"
                                                version="1.1"
                                            >
                                                <g id="arrow">
                                                    <path
                                                        className="one"
                                                        d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                    <path
                                                        className="two"
                                                        d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                    <path
                                                        className="three"
                                                        d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                                        fill="#FFFFFF"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <ImageIcon className="w-16 h-16 text-chiaro/50 mx-auto mb-4" />
                                    <p className="text-chiaro">Nessun link disponibile per questo progetto.</p>
                                </div>
                            )}
                        </div>

                    </div>
                    <hr className='my-8 ' />
                    {/* Technologies Section */}
                    {(frontendTechs.length > 0 || backendTechs.length > 0 || databaseTechs.length > 0) && (
                        <div className="">
                            <h2 className="text-3xl md:text-4xl font-bold text-bianco">Stack Tecnologico</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Frontend Technologies */}
                                {frontendTechs.length > 0 && (
                                    <div className="bg-scuro/50 rounded-xl p-5 flex flex-col ">
                                        <div className="flex items-center gap-3 ">
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-bianco"> Frontend</h3>
                                                <p className="text-md md:text-lg font-normal text-gray-200">
                                                    {frontendTechs.length} {frontendTechs.length === 1 ? 'tecnologia' : 'tecnologie'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {frontendTechs.map((tech) => (
                                                <div
                                                    key={tech.id}
                                                    className="group flex flex-col items-center p-4 bg-scuro-2/60 rounded-xl hover:bg-chiaro-2/30 transition-all duration-300  hover:border-chiaro-2/40 hover:scale-105 cursor-pointer"
                                                    title={tech.name}
                                                >
                                                    <div
                                                        className="w-14 h-14 rounded-lg flex items-center justify-center mb-2 bg-bianco/5 p-2 group-hover:bg-bianco/10 transition-colors"
                                                        dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                                    />
                                                    <span className="text-xs text-bianco font-medium text-center max-w-[80px] truncate">
                                                        {tech.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Backend Technologies */}
                                {backendTechs.length > 0 && (
                                    <div className=" p-5 ">
                                        <div className="flex items-center  gap-3 mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-bianco">Backend</h3>
                                                <p className="text-xs text-chiaro">
                                                    {backendTechs.length} {backendTechs.length === 1 ? 'tecnologia' : 'tecnologie'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {backendTechs.map((tech) => (
                                                <div
                                                    key={tech.id}
                                                    className="group flex flex-col items-center p-4 bg-scuro-2/60 rounded-xl hover:bg-chiaro-2/30 transition-all duration-300  hover:border-chiaro-2/40 hover:scale-105 cursor-pointer"
                                                    title={tech.name}
                                                >
                                                    <div
                                                        className="w-14 h-14 rounded-lg flex items-center justify-center mb-2 bg-bianco/5 p-2 group-hover:bg-bianco/10 transition-colors"
                                                        dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                                    />
                                                    <span className="text-xs text-bianco font-medium text-center max-w-[80px] truncate">
                                                        {tech.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Database Technologies */}
                                {databaseTechs.length > 0 && (
                                    <div className="bg-scuro/50 rounded-xl p-5 flex flex-col ">
                                        <div className="flex items-center gap-3 mb-4">
                                            
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-bianco">Database</h3>
                                                <p className="text-md md:text-lg font-normal text-gray-200">
                                                    {databaseTechs.length} {databaseTechs.length === 1 ? 'tecnologia' : 'tecnologie'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {databaseTechs.map((tech) => (
                                                <div
                                                    key={tech.id}
                                                    className="group flex flex-col items-center p-4 bg-scuro-2/60 rounded-xl hover:bg-chiaro-2/30 transition-all duration-300  hover:border-chiaro-2/40 hover:scale-105 cursor-pointer"
                                                    title={tech.name}
                                                >
                                                    <div
                                                        className="w-14 h-14 rounded-lg flex items-center justify-center mb-2 bg-bianco/5 p-2 group-hover:bg-bianco/10 transition-colors"
                                                        dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                                    />
                                                    <span className="text-xs text-bianco font-medium text-center max-w-[80px] truncate">
                                                        {tech.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <hr className='my-8 ' />
                    {/* Images Gallery Section */}
                    {(projectImages.pc.length > 0 || projectImages.tablet.length > 0 || projectImages.mobile.length > 0) && (
                        <div className=" p-6 md:p-8 ">
                            <div className="flex items-center gap-3 mb-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-bianco">Galleria Progetto</h2>
                            </div>

                            {/* Device Tabs - Enhanced Design */}
                            <div className="flex gap-3 mb-6 justify-center flex-wrap">
                                {projectImages.pc.length > 0 && (
                                    <button
                                        onClick={() => setActiveDeviceTab('pc')}
                                        className={`group px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border ${activeDeviceTab === 'pc'
                                            ? 'bg-gradient-chiaro text-bianco border-chiaro shadow-lg scale-105'
                                            : 'bg-scuro-2/50 text-chiaro border-chiaro-2/30 hover:bg-chiaro-2/20 hover:border-chiaro-2/50'
                                            }`}
                                    >
                                        <Monitor className={`w-5 h-5 transition-transform ${activeDeviceTab === 'pc' ? 'scale-110' : ''}`} />
                                        <span>Desktop</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeDeviceTab === 'pc'
                                            ? 'bg-bianco/20 text-bianco'
                                            : 'bg-chiaro-2/30 text-chiaro'
                                            }`}>
                                            {projectImages.pc.length}
                                        </span>
                                    </button>
                                )}
                                {projectImages.tablet.length > 0 && (
                                    <button
                                        onClick={() => setActiveDeviceTab('tablet')}
                                        className={`group px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border ${activeDeviceTab === 'tablet'
                                            ? 'bg-gradient-chiaro text-bianco border-chiaro shadow-lg scale-105'
                                            : 'bg-scuro-2/50 text-bianco border-chiaro-2/30 hover:bg-chiaro-2/20 hover:border-chiaro-2/50'
                                            }`}
                                    >
                                        <Tablet className={`w-5 h-5 transition-transform ${activeDeviceTab === 'tablet' ? 'scale-110' : ''}`} />
                                        <span>Tablet</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeDeviceTab === 'tablet'
                                            ? 'bg-bianco/20 text-bianco'
                                            : 'bg-chiaro-2/30 text-bianco'
                                            }`}>
                                            {projectImages.tablet.length}
                                        </span>
                                    </button>
                                )}
                                {projectImages.mobile.length > 0 && (
                                    <button
                                        onClick={() => setActiveDeviceTab('mobile')}
                                        className={`group px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border ${activeDeviceTab === 'mobile'
                                            ? 'bg-gradient-chiaro text-bianco border-chiaro shadow-lg scale-105'
                                            : 'bg-scuro-2/50 text-bianco border-chiaro-2/30 hover:bg-chiaro-2/20 hover:border-chiaro-2/50'
                                            }`}
                                    >
                                        <Smartphone className={`w-5 h-5 transition-transform ${activeDeviceTab === 'mobile' ? 'scale-110' : ''}`} />
                                        <span>Mobile</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeDeviceTab === 'mobile'
                                            ? 'bg-bianco/20 text-bianco'
                                            : 'bg-chiaro-2/30 text-bianco'
                                            }`}>
                                            {projectImages.mobile.length}
                                        </span>
                                    </button>
                                )}
                            </div>

                            {/* Images Grid - Enhanced */}
                            {currentImages.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {currentImages.map((img, index) => (
                                        <div
                                            key={img.id}
                                            className="group relative overflow-hidden rounded-xl border border-chiaro-2/20 hover:border-chiaro-2/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-scuro/30"
                                        >
                                            <img
                                                src={img.image_url}
                                                alt={`${progetto.title} - ${activeDeviceTab} - Immagine ${index + 1}`}
                                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-scuro-2/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <ImageIcon className="w-16 h-16 text-chiaro/50 mx-auto mb-4" />
                                    <p className="text-chiaro">Nessuna immagine disponibile per questo dispositivo.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ProgettoDettaglio;

