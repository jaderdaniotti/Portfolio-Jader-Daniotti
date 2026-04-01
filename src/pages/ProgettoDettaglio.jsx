import { useState, useEffect, useMemo } from 'react';
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
    Globe,
    ExternalLink,
    Image as ImageIcon,
    X
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
    const [lightboxImg, setLightboxImg] = useState(null);

    useEffect(() => {
        const loadProjectDetails = async () => {
            try {
                setLoading(true);

                const { data: projectData, error: projectError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (projectError) throw projectError;
                setProgetto(projectData);

                const { data: technologiesData, error: technologiesError } = await supabase
                    .from('technologies')
                    .select('*')
                    .order('order_index');

                if (!technologiesError) setAllTechnologies(technologiesData || []);

                const { data: imagesData, error: imagesError } = await supabase
                    .from('project_images')
                    .select('*')
                    .eq('project_id', id)
                    .order('order_index');

                if (!imagesError) {
                    const imagesByDevice = { pc: [], tablet: [], mobile: [] };
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

                    const firstAvailableDevice = ['pc', 'tablet', 'mobile'].find(
                        device => imagesByDevice[device]?.length > 0
                    );
                    if (firstAvailableDevice) setActiveDeviceTab(firstAvailableDevice);
                }

                const { data: projectTechsData, error: projectTechsError } = await supabase
                    .from('project_technologies')
                    .select('*')
                    .eq('project_id', id);

                if (!projectTechsError) {
                    const technologiesByType = { frontend: [], backend: [], database: [] };
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

        if (id) loadProjectDetails();
    }, [id]);

    const frontendTechs = useMemo(() => {
        if (!projectTechnologies.frontend) return [];
        return projectTechnologies.frontend
            .map(techId => allTechnologies.find(t => t.id === techId))
            .filter(Boolean);
    }, [projectTechnologies.frontend, allTechnologies]);

    const backendTechs = useMemo(() => {
        if (!projectTechnologies.backend) return [];
        return projectTechnologies.backend
            .map(techId => allTechnologies.find(t => t.id === techId))
            .filter(Boolean);
    }, [projectTechnologies.backend, allTechnologies]);

    const databaseTechs = useMemo(() => {
        if (!projectTechnologies.database) return [];
        return projectTechnologies.database
            .map(techId => allTechnologies.find(t => t.id === techId))
            .filter(Boolean);
    }, [projectTechnologies.database, allTechnologies]);
    const allProjectTechs = useMemo(
        () => [...frontendTechs, ...backendTechs, ...databaseTechs],
        [frontendTechs, backendTechs, databaseTechs]
    );
    const currentImages = projectImages[activeDeviceTab] || [];
    const hasImages = projectImages.pc.length > 0 || projectImages.tablet.length > 0 || projectImages.mobile.length > 0;

    const deviceConfig = {
        pc: { icon: Monitor, label: 'Desktop' },
        tablet: { icon: Tablet, label: 'Tablet' },
        mobile: { icon: Smartphone, label: 'Mobile' }
    };

    if (loading) {
        return (
            <>
                <SEOHead title="Caricamento Progetto - Jader Daniotti Portfolio" description="Caricamento dettagli progetto..." />
                <Navbar />
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <GlobalLoader />
                </div>
                <Footer />
            </>
        );
    }

    if (!progetto) {
        return (
            <>
                <SEOHead title="Progetto non trovato - Jader Daniotti Portfolio" description="Il progetto richiesto non è stato trovato." />
                <Navbar />
                <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
                    <h1 className="text-4xl text-white font-medium">Progetto non trovato</h1>
                    <button onClick={() => navigate('/progetti')} className="inline-flex items-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5">
                        Torna ai Progetti
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

            {/* Hero: full-bleed cover image + title overlay */}
            <section className="relative isolate min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden bg-scuro-2">
                {progetto.cover_image && (
                    <img
                        src={progetto.cover_image}
                        alt={progetto.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-45"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-white/6 to-transparent opacity-60" />

                <div className="relative z-10 w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
                    <button
                        onClick={() => navigate('/progetti')}
                        className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Tutti i progetti
                    </button>

                    <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-medium leading-[0.95] tracking-tight text-white" data-aos="fade-up">
                        {progetto.title}
                    </h1>

                    {allProjectTechs.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {allProjectTechs.map((tech) => (
                                <span key={tech.id} className="rounded-full border border-white/14 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/65">
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {progetto.domain_url && (
                        <div className="mt-8">
                            <a
                                href={progetto.domain_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-white/92"
                            >
                                <Globe className="w-4 h-4" />
                                Visita il sito
                                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Description */}
            <section className="relative bg-scuro-2 border-t border-white/8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        <div className="lg:col-span-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/42" data-aos="fade-up">
                                Il progetto
                            </p>
                            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-white">
                                Descrizione
                            </h2>
                        </div>
                        <div className="lg:col-span-8" data-aos="fade-up">
                            <p className="text-base md:text-lg leading-[1.8] text-white/72 font-normal">
                                {progetto.description || 'Nessuna descrizione disponibile per questo progetto.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stack Tecnologico */}
            {(frontendTechs.length > 0 || backendTechs.length > 0 || databaseTechs.length > 0) && (
                <section className="relative bg-scuro-2 border-t border-white/8">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/42" data-aos="fade-up">
                            Tecnologie
                        </p>
                        <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-white mb-14">
                            Stack Tecnologico
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-scuro-2/8 rounded-2xl overflow-hidden" data-aos="fade-up">
                            {[
                                { label: 'Frontend', techs: frontendTechs },
                                { label: 'Backend', techs: backendTechs },
                                { label: 'Database', techs: databaseTechs }
                            ].filter(g => g.techs.length > 0).map((group) => (
                                <div key={group.label} className="bg-scuro-2 p-8 md:p-10">
                                    <div className="flex items-baseline justify-between mb-8">
                                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">{group.label}</h3>
                                        <span className="text-xs text-white/30 tabular-nums">{group.techs.length}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {group.techs.map((tech) => (
                                            <div key={tech.id} className="group flex flex-col items-center gap-2.5" title={tech.name}>
                                                <div
                                                    className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 p-2.5 border border-white/8 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110"
                                                    dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                                />
                                                <span className="text-[11px] text-white/50 font-medium group-hover:text-white/80 transition-colors text-center max-w-[80px] truncate">
                                                    {tech.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery */}
            {hasImages && (
                <section className="relative bg-scuro-2 border-t border-white/8">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/42" data-aos="fade-up">
                                    Anteprime
                                </p>
                                <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-white">
                                    Galleria
                                </h2>
                            </div>

                            {/* Device switcher */}
                            <div className="flex rounded-full border border-white/12 bg-white/4 p-1" data-aos="fade-up">
                                {['pc', 'tablet', 'mobile'].filter(d => projectImages[d]?.length > 0).map((device) => {
                                    const DeviceIcon = deviceConfig[device].icon;
                                    const isActive = activeDeviceTab === device;
                                    return (
                                        <button
                                            key={device}
                                            onClick={() => setActiveDeviceTab(device)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-white text-black shadow-lg'
                                                    : 'text-white/50 hover:text-white/80'
                                            }`}
                                        >
                                            <DeviceIcon className="w-4 h-4" />
                                            <span className="hidden sm:inline">{deviceConfig[device].label}</span>
                                            <span className={`text-[10px] tabular-nums ${isActive ? 'text-black/50' : 'text-white/30'}`}>
                                                {projectImages[device].length}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {currentImages.length > 0 ? (
                            <div
                                className={`grid gap-4 md:gap-6 ${
                                    activeDeviceTab === 'mobile'
                                        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                }`}
                            >
                                {currentImages.map((img, index) => (
                                    <div
                                        key={img.id}
                                        className="group relative overflow-hidden rounded-xl border border-white/8 hover:border-white/20 transition-all duration-500 cursor-pointer bg-white/2"
                                        onClick={() => setLightboxImg(img.image_url)}
                                    >
                                        <div className={`overflow-hidden `}>
                                            <img
                                                src={img.image_url}
                                                alt={`${progetto.title} - ${deviceConfig[activeDeviceTab].label} - ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="text-xs text-white/70 font-medium uppercase tracking-widest">
                                                {deviceConfig[activeDeviceTab].label} {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 rounded-2xl border border-dashed border-white/12">
                                <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
                                <p className="text-white/40 text-sm">Nessuna immagine per questo dispositivo.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* CTA bottom */}
            <section className="relative bg-scuro-2 border-t border-white/8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/42">Prossimo passo</p>
                            <h2 className="mt-3 text-2xl md:text-3xl font-medium tracking-tight text-white">Ti interessa un progetto simile?</h2>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/progetti')}
                                className="inline-flex items-center gap-2 rounded-sm border border-white/18 px-7 py-3.5 text-sm font-semibold text-white/88 transition-all hover:border-white/40 hover:bg-white/6"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Altri progetti
                            </button>
                            <button
                                onClick={() => navigate('/contatti')}
                                className="inline-flex items-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-white/92"
                            >
                                Contattami
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxImg && (
                <div
                    className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setLightboxImg(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
                        onClick={() => setLightboxImg(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={lightboxImg}
                        alt="Anteprima ingrandita"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <Footer />
        </>
    );
}

export default ProgettoDettaglio;
