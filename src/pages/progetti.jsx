import { useState, useEffect } from 'react';
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti'
import Navbar from "../Navbar";
import Footer from "../Footer";
import SEOHead from '../components/SEOHead';
import { supabase } from '../config/supabase';
import { Monitor, Tablet, Smartphone, X, Code } from 'lucide-react';
import GlobalLoader from '../components/GlobalLoader';

function Progetti() {
    const [progetti, setProgetti] = useState([]);
    const [projectImages, setProjectImages] = useState({}); // { projectId: { pc: [], tablet: [], mobile: [] } }
    const [projectTechnologies, setProjectTechnologies] = useState({}); // { projectId: { frontend: [], backend: [], database: [] } }
    const [allTechnologies, setAllTechnologies] = useState([]); // Tutte le tecnologie disponibili
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingStatus, setLoadingStatus] = useState('Inizializzazione...');
    const [activeDeviceTab, setActiveDeviceTab] = useState({}); // { projectId: 'pc' | 'tablet' | 'mobile' }
    
   

    // Carica progetti e immagini dal database
    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                setLoadingProgress(0);
                setLoadingStatus('Caricamento progetti...');
                
                // Fetch progetti e tecnologie
                const [projectsRes, technologiesRes] = await Promise.all([
                    supabase.from('projects').select('*').order('order_index'),
                    supabase.from('technologies').select('*').order('order_index')
                ]);

                if (projectsRes.error) throw projectsRes.error;
                if (technologiesRes.error) throw technologiesRes.error;

                const projectsData = projectsRes.data || [];
                setProgetti(projectsData);
                setAllTechnologies(technologiesRes.data || []);
                setLoadingProgress(30);
                setLoadingStatus('Progetti caricati, caricamento immagini...');

                // Fetch immagini e tecnologie per ogni progetto
                if (projectsData && projectsData.length > 0) {
                    const imagesByProject = {};
                    const technologiesByProject = {};
                    const totalProjects = projectsData.length;
                    let loadedProjects = 0;
                    
                    for (const project of projectsData) {
                        // Fetch immagini
                        setLoadingStatus(`Caricamento immagini per ${project.title}...`);
                        const { data: imagesData, error: imagesError } = await supabase
                            .from('project_images')
                            .select('*')
                            .eq('project_id', project.id)
                            .order('order_index');

                        if (imagesError) {
                            console.error(`Errore nel caricamento immagini per progetto ${project.id}:`, imagesError);
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

                            imagesByProject[project.id] = imagesByDevice;
                            
                            // Imposta tab attiva di default al primo device disponibile
                            setActiveDeviceTab(prev => {
                                if (!prev[project.id]) {
                                    const firstAvailableDevice = ['pc', 'tablet', 'mobile'].find(
                                        device => imagesByDevice[device] && imagesByDevice[device].length > 0
                                    );
                                    if (firstAvailableDevice) {
                                        return {
                                            ...prev,
                                            [project.id]: firstAvailableDevice
                                        };
                                    }
                                }
                                return prev;
                            });
                        }

                        // Fetch tecnologie del progetto
                        setLoadingStatus(`Caricamento tecnologie per ${project.title}...`);
                        const { data: projectTechsData, error: projectTechsError } = await supabase
                            .from('project_technologies')
                            .select('*')
                            .eq('project_id', project.id);

                        if (projectTechsError) {
                            console.error(`Errore nel caricamento tecnologie per progetto ${project.id}:`, projectTechsError);
                        } else {
                            // Organizza le tecnologie per tipo (frontend/backend/database)
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

                            technologiesByProject[project.id] = technologiesByType;
                        }

                        loadedProjects++;
                        // Aggiorna progresso: 30% base + 60% per progetti (30% + (60% * loadedProjects / totalProjects))
                        const progress = 30 + Math.round((60 * loadedProjects) / totalProjects);
                        setLoadingProgress(progress);
                    }

                    setProjectImages(imagesByProject);
                    setProjectTechnologies(technologiesByProject);
                    setLoadingStatus('Finalizzazione...');
                    setLoadingProgress(95);
                    
                    // Piccolo delay per mostrare il 100%
                    await new Promise(resolve => setTimeout(resolve, 300));
                    setLoadingProgress(100);
                    setLoadingStatus('Completato!');
                    
                    // Delay finale prima di nascondere il loader
                    await new Promise(resolve => setTimeout(resolve, 200));
                } else {
                    setLoadingProgress(100);
                    setLoadingStatus('Completato!');
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            } catch (error) {
                console.error('Errore nel caricamento progetti:', error);
                setLoadingStatus('Errore nel caricamento');
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    // Cambia tab device per un progetto
    const handleDeviceTabChange = (projectId, deviceType) => {
        setActiveDeviceTab(prev => ({
            ...prev,
            [projectId]: deviceType
        }));
    };

    // Apri modale per un progetto
    const openModal = (progetto) => {
        const modal = document.getElementById(`modal_${progetto.id}`);
        if (modal) {
            modal.showModal();
        }
    };

    // Chiudi modale
    const closeModal = (progettoId) => {
        const modal = document.getElementById(`modal_${progettoId}`);
        if (modal) {
            modal.close();
        }
    };

    // Componente per il contenuto del progetto (riutilizzabile per accordion e modale)
    const ProjectContent = ({ progetto, projectImagesData, currentDeviceTab, onDeviceTabChange, projectTechnologiesData, allTechnologies }) => {
        const currentImages = projectImagesData[currentDeviceTab] || [];
        
        // Ottieni le tecnologie complete per questo progetto
        const getTechnologiesByType = (type) => {
            if (!projectTechnologiesData || !projectTechnologiesData[type]) return [];
            return projectTechnologiesData[type]
                .map(techId => allTechnologies.find(t => t.id === techId))
                .filter(Boolean);
        };

        const frontendTechs = getTechnologiesByType('frontend');
        const backendTechs = getTechnologiesByType('backend');
        const databaseTechs = getTechnologiesByType('database');

    return (
        <>
                <hr className="mb-5 w-full" />
                <h4 className="text-3xl mb-2 font-semibold text-bianco">Descrizione del progetto:</h4>
                <p className="text-xl font-normal mb-4 max-w-4xl text-bianco">{progetto.description || 'Nessuna descrizione disponibile'}</p>
                
                {/* Sezione Tecnologie */}
                {(frontendTechs.length > 0 || backendTechs.length > 0 || databaseTechs.length > 0) && (
                    <>
                        <hr className="my-5 w-full max-w-4xl" />
                        <h4 className="text-xl mt-4 mb-4 font-semibold text-bianco">Tecnologie Utilizzate:</h4>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 mb-4">
                            {/* Frontend Technologies */}
                            {frontendTechs.length > 0 && (
                               <div className="text-center rounded-xl p-5 ">
                               <div className="flex justify-center items-center mb-4">
                                   <div className="p-2 bg-bianco rounded-lg mr-2">
                                            <Code className="w-5 h-5 text-scuro" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-bianco">Frontend</h5>
                                            <p className="text-xs text-bianco font-normal">
                                                {frontendTechs.length} {frontendTechs.length === 1 ? 'tecnologia' : 'tecnologie'}
                                            </p>
                                        </div>
            </div>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {frontendTechs.map((tech) => (
                                            <div
                                                key={tech.id}
                                                className="flex flex-col items-center p-3 bg-scuro-2 rounded-lg hover:bg-scuro transition-colors"
                                                title={tech.name}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded flex items-center justify-center mb-2"
                                                    dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                                />
                                                <span className="text-sm text-bianco font-medium text-center">{tech.name}</span>
                    </div>
                ))}
            </div>
                                </div>
                            )}

                            {/* Backend Technologies */}
                            {backendTechs.length > 0 && (
                                <div className="text-center rounded-xl p-5 ">
                                    <div className="flex justify-center items-center mb-4">
                                        <div className="p-2 bg-bianco rounded-lg mr-2">
                                            <Code className="w-5 h-5 text-scuro" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-bianco">Backend</h5>
                                            <p className="text-xs text-bianco font-normal">
                                                {backendTechs.length} {backendTechs.length === 1 ? 'tecnologia' : 'tecnologie'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {backendTechs.map((tech) => (
                                            <div
                                                key={tech.id}
                                                className="flex flex-col items-center p-3 bg-scuro-2 rounded-lg hover:bg-scuro transition-colors"
                                                title={tech.name}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded flex items-center justify-center mb-2"
                                                    dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                                />
                                                <span className="text-sm text-bianco font-medium text-center">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Database Technologies */}
                            {databaseTechs.length > 0 && (
                                <div className="text-center rounded-xl p-5 ">
                                <div className="flex justify-center items-center mb-4">
                                    <div className="p-2 bg-bianco rounded-lg mr-2">
                                            <Code className="w-5 h-5 text-scuro" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-bianco">Database</h5>
                                            <p className="text-xs text-bianco font-normal">
                                                {databaseTechs.length} {databaseTechs.length === 1 ? 'tecnologia' : 'tecnologie'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {databaseTechs.map((tech) => (
                                            <div
                                                key={tech.id}
                                                className="flex flex-col items-center p-3 bg-scuro-2 rounded-lg hover:bg-scuro transition-colors"
                                                title={tech.name}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded flex items-center justify-center mb-2"
                                                    dangerouslySetInnerHTML={{ __html: tech.svg_code }}
                                                />
                                                <span className="text-sm text-bianco font-medium text-center">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
                
                {/* Sezione Immagini con Tabs per Device */}
                {(projectImagesData.pc.length > 0 || projectImagesData.tablet.length > 0 || projectImagesData.mobile.length > 0) && (
                    <>
                            <hr className="my-5 w-full max-w-4xl" />
                        <h4 className="text-xl mt-4 mb-4 font-semibold text-bianco">Immagini del Progetto:</h4>
                        
                        {/* Tabs per device */}
                        <div className="flex gap-2 mb-4 justify-center flex-wrap">
                            {projectImagesData.pc.length > 0 && (
                                <button
                                    onClick={() => onDeviceTabChange(progetto.id, 'pc')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                        currentDeviceTab === 'pc'
                                            ? 'bg-chiaro text-bianco'
                                            : 'bg-scuro-1 text-chiaro hover:bg-scuro'
                                    }`}
                                >
                                    <Monitor className="w-4 h-4" />
                                    PC ({projectImagesData.pc.length})
                                </button>
                            )}
                            {projectImagesData.tablet.length > 0 && (
                                <button
                                    onClick={() => onDeviceTabChange(progetto.id, 'tablet')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                        currentDeviceTab === 'tablet'
                                            ? 'bg-chiaro text-bianco'
                                            : 'bg-scuro-1 text-chiaro hover:bg-scuro'
                                    }`}
                                >
                                    <Tablet className="w-4 h-4" />
                                    Tablet ({projectImagesData.tablet.length})
                                </button>
                            )}
                            {projectImagesData.mobile.length > 0 && (
                                <button
                                    onClick={() => onDeviceTabChange(progetto.id, 'mobile')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                        currentDeviceTab === 'mobile'
                                            ? 'bg-chiaro text-bianco'
                                            : 'bg-scuro-1 text-chiaro hover:bg-scuro'
                                    }`}
                                >
                                    <Smartphone className="w-4 h-4" />
                                    Mobile ({projectImagesData.mobile.length})
                                </button>
                            )}
                        </div>

                        {/* Grid immagini per device selezionato */}
                        {currentImages.length > 0 ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-6xl w-full px-4 mb-4">
                                {currentImages.map((img) => (
                                    <li key={img.id}>
                                        <img 
                                            src={img.image_url} 
                                            alt={`${progetto.title} - ${currentDeviceTab}`} 
                                            className="w-full h-auto rounded-lg shadow-sm" 
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-chiaro mb-4">Nessuna immagine disponibile per questo dispositivo.</p>
                        )}
                    </>
                )}

                            <hr className="my-5 w-full max-w-4xl" />
                
                {/* Link al sito se disponibile */}
                {progetto.domain_url && (
                    <div className="mb-4">
                        <a className="cta mx-auto w-auto" href={progetto.domain_url} target="_blank" rel="noopener noreferrer">
                                        <span className="span">Sito</span>
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
                )}
            </>
        );
    };

    if (loading) {
        return (
            <>
                <SEOHead
                    title="Progetti - Jader Daniotti Portfolio"
                    description="Scopri i progetti di Jader Daniotti"
                />
                <Navbar />
                <div className="min-h-screen bg-scuro-2 flex flex-col items-center justify-center">
                    <GlobalLoader onLoadingComplete={() => {}}/>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <SEOHead
                title="Progetti - Jader Daniotti Portfolio"
                description="Scopri i progetti di Jader Daniotti: sviluppo web con React, Laravel, PHP e JavaScript."
                keywords="progetti web, React, Laravel, PHP, JavaScript, sviluppo web"
            />
            <Navbar></Navbar>

            <div className="py-10 " id="indice">
                <h1 className="text-center text-6xl md:text-8xl titolo-bianco">PROGETTI</h1>
                            </div>
            <hr className='mb-10' />
            
           
            {/* Grid progetti */}
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-8 px-2 items-stretch" id='projects'>
                {progetti.map((progetto) => (
                    <div key={progetto.id} className="flex flex-col h-full">
                        <div onClick={() => openModal(progetto)} className="cursor-pointer h-full">
                            <CardAnteprimaProgetti
                                title={progetto.title}
                                description={progetto.description}
                                imageUrl={progetto.cover_image || ''}
                                link={progetto.domain_url || null}
                            />
                        </div>
                    </div>
                ))}
            </div>
            

            {/* Modali fullscreen per ogni progetto */}
            {progetti.map((progetto) => {
                const projectImagesData = projectImages[progetto.id] || { pc: [], tablet: [], mobile: [] };
                const projectTechnologiesData = projectTechnologies[progetto.id] || { frontend: [], backend: [], database: [] };
                const currentDeviceTab = activeDeviceTab[progetto.id] || 'pc';

                return (
                    <dialog key={`modal_${progetto.id}`} id={`modal_${progetto.id}`} className="modal">
                        <div className="modal-box w-screen max-w-full h-full max-h-full bg-scuro-2 rounded-none">
                            {/* Header modale */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-4xl md:text-5xl text-bianco">{progetto.title}</h3>
                                <form method="dialog">
                                    <button 
                                        className="btn btn-sm btn-circle btn-ghost text-bianco hover:bg-scuro-1"
                                        onClick={() => closeModal(progetto.id)}
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </form>
                            </div>
                            
                            {/* Contenuto scrollabile */}
                            <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
                                <div className="flex flex-col items-center text-center">
                                    <ProjectContent 
                                        progetto={progetto}
                                        projectImagesData={projectImagesData}
                                        currentDeviceTab={currentDeviceTab}
                                        onDeviceTabChange={handleDeviceTabChange}
                                        projectTechnologiesData={projectTechnologiesData}
                                        allTechnologies={allTechnologies}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Backdrop per chiudere cliccando fuori */}
                        <form method="dialog" className="modal-backdrop">
                            <button onClick={() => closeModal(progetto.id)}>close</button>
                        </form>
                    </dialog>
                );
            })}

            <Footer></Footer>
        </>
    )
}

export default Progetti
