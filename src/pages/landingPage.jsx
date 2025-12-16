
import SplitText from '../components/ui/splitText';
import LightPillar from '../components/LightPillar';
import { supabase } from '../config/supabase';
import { useEffect, useState } from 'react';
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti';
import avatarcomputer from '../assets/images/logopc.png'
import LogoLoop from '../components/LogoLoop';
import {
    SiGit,
    SiHtml5,
    SiCss3,
    SiBootstrap,
    SiTailwindcss,
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiSupabase,
    SiPhp,
    SiLaravel,
    SiLivewire,
    SiMysql,
    SiPython,

} from 'react-icons/si';
export default function LandingPage() {
    const [progetti, setProgetti] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile devices for performance optimization
    useEffect(() => {
        const checkMobile = () => {
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                || window.innerWidth < 768;
            setIsMobile(mobile);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    let contatti = [
        { name: "Linkedin", icona: "bi bi-linkedin", link: "https://www.linkedin.com/in/jader-daniotti-0a00b9328/" },
        { name: "Instagram", icona: "bi bi-instagram", link: "https://www.instagram.com/jader_ness/" },
        { name: "Whatsapp", icona: "bi bi-whatsapp", link: "https://wa.me/3513152008" },
        { name: "Telefono", icona: "bi bi-telephone", link: "tel:+3935152008" },
        { name: "Email", icona: "bi bi-envelope", link: "mailto:jaderdaniotti.lavoro@gmail.com" },
    ]

    const techLogos = [
        { node: <SiHtml5 />, title: "HTML5", href: "https://www.html.com" },
        { node: <SiCss3 />, title: "CSS3", href: "https://www.css.com" },
        { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
        { node: <SiBootstrap />, title: "Bootstrap", href: "https://getbootstrap.com" },
        { node: <SiJavascript />, title: "JavaScript", href: "https://www.javascript.com" },
        { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
        { node: <SiReact />, title: "React", href: "https://react.dev" },
        { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
        { node: <SiPhp />, title: "PHP", href: "https://www.php.net" },
        { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
        { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
        { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
        { node: <SiPython />, title: "Python", href: "https://www.python.org" },
        { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
        { node: <SiLivewire />, title: "Livewire", href: "https://laravel-livewire.com" },
    ];

    // Fetch degli ultimi 3 progetti dal database
    useEffect(() => {
        const fetchProgetti = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(4);

                if (error) throw error;

                // Mappa i dati dal database al formato atteso dal componente
                const progettiFormattati = (data || []).map(progetto => ({
                    title: progetto.title,
                    description: progetto.description || '',
                    imageUrl: progetto.cover_image || '',
                    link: progetto.domain_url || null
                }));

                setProgetti(progettiFormattati);
            } catch (error) {
                console.error('Errore nel caricamento progetti:', error);
                setProgetti([]);
            }
        };

        fetchProgetti();
    }, []);

    return (
        <div className='bg-scuro min-h-screen relative'>
            {/* Disabilita LightPillar su mobile per migliorare le performance */}
            {!isMobile && (
                <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
                    <LightPillar
                        topColor="#1b152f"
                        bottomColor="#443C68"
                        intensity={0.8}
                        rotationSpeed={0.2}
                        glowAmount={0.003}
                        pillarWidth={2.5}
                        pillarHeight={0.3}
                        noiseIntensity={0.3}
                        pillarRotation={0}
                        interactive={false}
                        mixBlendMode="normal"
                    />
                </div>
            )}
            {/* hero */}
            <section className='min-h-screen relative px-5 flex flex-col justify-center lg:grid lg:grid-cols-3 pb-16'>
                <div className="flex flex-col lg:col-span-2 justify-center mb-8 lg:mb-0 relative z-10">
                    {/* Usa animazioni più leggere su mobile */}
                    {isMobile ? (
                        <>
                            <h1 className='text-bianco horizon text-left text-5xl sm:text-7xl md:text-8xl lg:text-7xl 2xl:text-9xl'>Jader Daniotti</h1>
                            <p className='text-bianco inter capitalize text-2xl sm:text-2xl md:text-5xl lg:text-5xl'>Fullstack Developer</p>
                        </>
                    ) : (
                        <>
                            <SplitText text='Jader Daniotti'
                                className='text-bianco horizon text-left text-5xl sm:text-7xl md:text-8xl lg:text-7xl 2xl:text-9xl' 
                                delay={50}
                                duration={0.4} />
                            <SplitText text='Fullstack Developer' 
                                className='text-bianco inter capitalize text-2xl sm:text-2xl md:text-5xl lg:text-5xl'
                                delay={50}
                                duration={0.4} />
                        </>
                    )}
                </div>
                <div className="flex lg:justify-center items-center lg:col-span-1 relative z-10">
                    <ul className="flex flex-col gap-3 sm:gap-4 geist text-bianco text-2xl sm:text-xl md:text-4xl lg:text-4xl  2xl:text-5xl uppercase text-left lg:text-center  ul-landing">
                        <li><a href="#aboutme">#Chi sono</a></li>
                        <li><a href="#skills">#Competenze</a></li>
                        <li><a href="#projects">#Progetti</a></li>
                        <li><a href="#contacts">#Contatti</a></li>
                    </ul>
                </div>
            </section>
            {/* chisono */}
            <section className="border-t-2 border-bianco gap-12 min-h-screen relative px-5 flex flex-col justify-evenly lg:grid lg:grid-cols-2 py-6 overflow-hidden" id='aboutme'>
                {/* Lazy loading per immagine pesante */}
                <div className="absolute bottom-0 left-1/3 w-full h-full opacity-30">
                    <img 
                        src={avatarcomputer} 
                        alt="avatarcomputer" 
                        className="size-full object-contain" 
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="flex flex-col lg:col-span-1 justify-start mb-8 lg:mb-0 relative z-10">
                    <h1 className="horizon text-7xl sm:text-7xl md:text-8xl  2xl:text-9xl">#Chi sono</h1>
                </div>
                <div className="flex flex-col lg:col-span-2 justify-end mb-8 lg:mb-0 relative z-10">
                    <p className="inter uppercase font-semibold text-5xl sm:text-5xl 2xl:text-9xl text-right">Ciao! Mi chiamo Jader e sono Fullstack Developer</p>
                </div>
            </section>
             {/* competenze */}
             <section className="border-t-2 border-bianco relative px-5 flex flex-col justify-center py-6" id='skills'>
                <div className="flex flex-col lg:col-span-1 mb-6 relative z-10">
                    <h1 className="horizon text-3xl md:text-6xl lg:text-7xl 2xl:text-9xl text-center">#Competenze</h1>
                    <p className="inter uppercase font-semibold text-2xl md:text-3xl lg:text-4xl 2xl:text-4xl text-center">Ecco alcune delle mie competenze</p>
                </div>
                <div className='mb-0' style={{ height: 'auto', position: 'relative', overflow: 'hidden' }}>
                    {/* Riduce velocità e disabilita hover su mobile */}
                    <LogoLoop
                        logos={techLogos}
                        speed={isMobile ? 25 : 40}
                        direction="left"
                        logoHeight={isMobile ? 36 : 48}
                        gap={isMobile ? 30 : 50}
                        hoverSpeed={0}
                        scaleOnHover={!isMobile}
                        ariaLabel="Technology partners"
                    />
                </div>
            </section>
            {/* progetti */}
            <section className="border-t-2 border-bianco gap-12 min-h-screen relative px-5 flex flex-col justify-evenly  py-6" id='projects'>
                <div className="flex flex-col lg:col-span-1 justify-start mb-8 lg:mb-0 relative z-10">
                    <h1 className="horizon text-3xl md:text-8xl  2xl:text-9xl">#Progetti</h1>
                    <p className="inter uppercase font-semibold text-3xl 2xl:text-4xl text-left">Ecco alcuni dei miei progetti</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-start align-middle items-stretch" id='projects'>
                    {progetti.map((progetto, index) => (
                        <div key={index}>
                            <CardAnteprimaProgetti
                                title={progetto.title}
                                description={progetto.description}
                                imageUrl={progetto.imageUrl}
                                link={progetto.link}
                            />
                        </div>
                    ))}
                </div>
            </section>
           
            {/* contatti */}
            <section className="border-t-2 border-bianco relative px-5 flex flex-col justify-center py-6" id='contacts'>
                <div className="flex flex-col lg:col-span-1 mb-6 relative z-10">
                    <h1 className="horizon text-3xl md:text-6xl lg:text-7xl 2xl:text-9xl text-center">#Contatti</h1>
                </div>
                <div className="flex flex-row  gap-8 justify-center align-middle items-center">
                    {contatti.map((contatto, index) => (
                        <div key={index}>
                            <a href={contatto.link} target="_blank" rel="noopener noreferrer" className="text-bianco text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl">
                                <i className={contatto.icona}></i>
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* footer */}
            <section className="border-t-2 border-bianco relative px-5 flex flex-col justify-center py-6" id='footer'>
                <div className="flex flex-col lg:col-span-1 mb-6 relative z-10">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="inter uppercase font-semibold text-2xl md:text-3xl lg:text-4xl 2xl:text-4xl text-center">Torna alla Home</a>
                </div>
            </section>
        </div>
    )
}