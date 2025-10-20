import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState, useEffect, useMemo } from "react";
import SkillSection from "../components/skillSection";
import Marquee from "react-fast-marquee";
import SEOHead from '../components/SEOHead';
import { portfolioAPI } from '../config/supabase';

function Competenze() {
    
    // Stati per i dati dal database
    const [frontendSkills, setFrontendSkills] = useState([]);
    const [backendSkills, setBackendSkills] = useState([]);
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch dei dati dal database
    useEffect(() => {
        const fetchAllSkills = async () => {
            try {
                setLoading(true);
                
                // Fetch frontend skills
                const frontendResult = await portfolioAPI.getTechnologiesByCategory('frontend');
                if (frontendResult.success) {
                    setFrontendSkills(frontendResult.data);
                }
                
                // Fetch backend skills
                const backendResult = await portfolioAPI.getTechnologiesByCategory('backend');
                if (backendResult.success) {
                    setBackendSkills(backendResult.data);
                }
                
                // Fetch tools
                const toolsResult = await portfolioAPI.getTools();
                if (toolsResult.success) {
                    setTools(toolsResult.data);
                }
                
            } catch (error) {
                console.error('Errore nel caricamento skills:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllSkills();
    }, []);

    // Creo skillData dinamico dai dati del database con useMemo
    const skillData = useMemo(() => ({
        frontend: frontendSkills.map(skill => ({
            name: skill.name,
            svg: skill.svg_code,
            percent: skill.percent
        })),
        backend: backendSkills.map(skill => ({
            name: skill.name,
            svg: skill.svg_code,
            percent: skill.percent
        })),
        tools: tools.map(tool => ({
            name: tool.name,
            svg: tool.svg_code,
            percent: tool.percent
        }))
    }), [frontendSkills, backendSkills, tools]);

    // Stati per i componenti SkillSection
    const [currentFrontend, setCurrentFrontend] = useState(null);
    const [currentBackend, setCurrentBackend] = useState(null);
    const [currentTool, setCurrentTool] = useState(null);

    // Aggiorna gli stati quando i dati sono caricati
    useEffect(() => {
        if (skillData.frontend.length > 0 && !currentFrontend) {
            setCurrentFrontend(skillData.frontend[0]);
        }
        if (skillData.backend.length > 0 && !currentBackend) {
            setCurrentBackend(skillData.backend[0]);
        }
        if (skillData.tools.length > 0 && !currentTool) {
            setCurrentTool(skillData.tools[0]);
        }
    }, [skillData, currentFrontend, currentBackend, currentTool]);

    // Array per le immagini degli strumenti (mantenuto come richiesto)
    const immaginiStrumenti = [
        "/immagini/STRUMENTI/canva-wordmark-2.svg",
        "/immagini/STRUMENTI/cpanel.svg",
        "/immagini/STRUMENTI/discord-wordmark-1.svg",
        "/immagini/STRUMENTI/miro-2.svg",
        "/immagini/STRUMENTI/postman.svg",
        "/immagini/STRUMENTI/git-bash.svg",
        "/immagini/STRUMENTI/gsap-greensock.svg",
        "/immagini/STRUMENTI/shopify.svg",
        "/immagini/STRUMENTI/hostinger.svg",
        "/immagini/STRUMENTI/figma-icon.svg",
        "/immagini/STRUMENTI/wordpress-icon-1.svg",
        "/immagini/STRUMENTI/zoom-communications-logo.svg"
    ];

    return (
        <>
            <SEOHead
                title="Competenze - Jader Daniotti | Fullstack Developer Skills"
                description="Scopri le competenze tecniche di Jader Daniotti: HTML, CSS, JavaScript, React, Laravel, PHP e molti altri strumenti di sviluppo web."
                keywords="competenze, skills, HTML, CSS, JavaScript, React, Laravel, PHP, sviluppo web, frontend, backend, tools"
            />
            <Navbar />
            <div className="py-10 px-5" id="indice">
                <h1 className="text-center text-5xl md:text-8xl titolo-bianco">COMPETENZE</h1>
            </div>
            <hr className='mb-10' />
            
            {loading ? (
                <div className="text-center w-[100vw] h-[100vh] flex items-center justify-center py-20">
                    <div className="loading loading-spinner loading-xl"></div>
                </div>
            ) : (
                <>
                    {skillData.frontend.length > 0 && (
                        <>
                            <SkillSection
                                title="Frontend"
                                skills={skillData.frontend}
                                currentSkill={currentFrontend}
                                setCurrentSkill={setCurrentFrontend}
                            />
                            <hr className='my-10' />
                        </>
                    )}
                    
                    {skillData.backend.length > 0 && (
                        <>
                            <SkillSection
                                title="Backend"
                                skills={skillData.backend}
                                currentSkill={currentBackend}
                                setCurrentSkill={setCurrentBackend}
                            />
                            <hr className='my-10' />
                        </>
                    )}
                    
                    {skillData.tools.length > 0 && (
                        <>
                            <SkillSection
                                title="Tools"
                                skills={skillData.tools}
                                currentSkill={currentTool}
                                setCurrentSkill={setCurrentTool}
                            />
                            <hr className='my-10' />
                        </>
                    )}

                    <section>
                        <h2 className="text-center text-4xl md:text-6xl py-10">Altri tools</h2>
                        <div className="bg-chiaro-2 py-1">
                            <Marquee pauseOnHover={true} speed={150} gradient={false} >
                                {immaginiStrumenti.map((item, idx) => (
                                    <span key={idx} className="carosello-item mx-15 ">
                                        <img src={item} alt="" className="w-17  object-contain transition-transform hover:scale-110 duration-300 linear" />
                                    </span>
                                ))}
                            </Marquee>
                        </div>
                        <hr className='my-10' />
                    </section>
                </>
            )}
            <Footer />
        </>
    );
}

export default Competenze