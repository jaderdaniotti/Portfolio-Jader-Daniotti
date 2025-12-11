import { useState, useEffect } from "react";
import BigButton from '../components/bigButton'
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti'
import Navbar from "../Navbar";
import Footer from "../Footer";
import Marquee from "react-fast-marquee";
import SEOHead from '../components/SEOHead';
import RoboticHand3D from '../components/RoboticHand3D';
import { portfolioAPI, supabase } from '../config/supabase';
import Background from '../components/ui/bghome';
import BlobCursor from '../components/BlobCursor';

function Home() {

    const [tecnologie, setTecnologie] = useState([]);
    const [tools, setTools] = useState([]);
    const [progetti, setProgetti] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch delle tecnologie dal database
    useEffect(() => {
        const fetchTecnologie = async () => {
            try {
                const result = await portfolioAPI.getTechnologies();
                if (result.success) {
                    setTecnologie(result.data);
                } else {
                    console.error('Errore nel caricamento tecnologie:', result.error);
                }
            } catch (error) {
                console.error('Errore nella fetch tecnologie:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTecnologie();
    }, []);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const result = await portfolioAPI.getTools();
                if (result.success) {
                    setTools(result.data);
                } else {
                    console.error('Errore nel caricamento tecnologie:', result.error);
                }
            } catch (error) {
                console.error('Errore nella fetch tools:', error);
            } finally {
                setLoading(false);

            }
        };
        fetchTools();
    }, []);


    // Fetch degli ultimi 3 progetti dal database
    useEffect(() => {
        const fetchProgetti = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(3);

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

    let contatti = [
        { name: "Linkedin", icona: "bi bi-linkedin", link: "https://www.linkedin.com/in/jader-daniotti-0a00b9328/" },
        { name: "Instagram", icona: "bi bi-instagram", link: "https://www.instagram.com/jader_ness/" },
        { name: "Whatsapp", icona: "bi bi-whatsapp", link: "https://wa.me/3513152008" },
        { name: "Telefono", icona: "bi bi-telephone", link: "tel:+3935152008" },
        { name: "Email", icona: "bi bi-envelope", link: "mailto:jaderdaniotti.lavoro@gmail.com" },
    ]
    return (
        <>
            <BlobCursor
                blobType="circle"
                fillColor="#443C68"
                trailCount={3}
                sizes={[40, 80, 50]}
                innerSizes={[20, 35, 25]}
                innerColor="rgba(255,255,255,0.8)"
                opacities={[0.6, 0.6, 0.6]}
                shadowColor="rgba(0,0,0,0.75)"
                shadowBlur={5}
                shadowOffsetX={10}
                shadowOffsetY={10}
                filterStdDeviation={30}
                useFilter={true}
                fastDuration={0.5}
                slowDuration={0.5}
                zIndex={1}
            />
            <div className="bg-svg relative overflow-hidden">
                <div className="relative z-10">

                    <SEOHead
                        title="Jader Daniotti - Fullstack Developer & Web Designer | Portfolio"
                        description="Portfolio di Jader Daniotti - Fullstack Developer specializzato in Frontend, UI/UX, Web Design e soluzioni digitali personalizzate. Scopri i progetti, le competenze e i servizi."
                        keywords="Jader Daniotti, Fullstack Developer, Web Design, UI/UX, Frontend, Portfolio, Sviluppo Web, React, Laravel, PHP, JavaScript, HTML, CSS"
                    />
                    <Navbar />
                    {/* hero */}
                    {/* <div className="hero h-screen relative" id='home'>
                        <Background />
                        <div className="hero-content text-center">
                            <div className="max-w-md py-10 ">
                                <p className="text-6xl tracking-tight md:text-7xl" data-aos="zoom-in" data-aos-duration="500">Ciao!</p>
                                <p className="text-7xl tracking-tight md:text-8xl" data-aos="zoom-in" data-aos-duration="500">Sono</p>
                                <h1 className="text-bianco tracking-tight text-8xl md:text-9xl " data-aos="zoom-in" data-aos-duration="500">Jader
                                </h1>
                                <p className="py-6 text-3xl font-medium text-bianco" >
                                    Fullstack Developer con una preferenza verso il Frontend.
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr /> */}
                    {/* hero */}
                    <div className="hero h-screen relative" id='home'>
                        <Background />
                        <div className="hero-content geist font-semibold text-center">
                            <div className="my-auto mx-auto py-10 text-center">
                                <h2 className="text-6xl tracking-tight md:text-6xl flex items-center justify-center gap-4 font-bold text-bianco">
                                    Sono
                                </h2>
                                    <div class="dropping-texts relative text-6xl mt-3 tracking-tight md:text-7xl font-extrabold">
                                        <div></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* chi sono */}
                    <section className="py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 align-center items-center justify-center  px-5 py-5 w-full text-center" id='chi-sono'>
                            <div className="text-center flex-col py-10">
                                <h1 className="titolo-bianco tracking-tight text-7xl" data-aos="zoom-in" >Chi sono?</h1>
                                <p className="py-6 text-3xl" data-aos="zoom-in" >
                                    Ciao a tutti, mi chiamo Jader Daniotti, sono un appassionato di <br /> <span className='text-chiaro'>Web Design</span>, <br /> <span className='text-chiaro'>UI/UX</span> e <br /><span className='text-chiaro'>Programmazione</span>.
                                </p>
                                <BigButton text="CONOSCIMI" href="/Chisono"></BigButton>
                            </div>
                            <div className="shadow shadow-fuchsia-200 rounded-full border-fuchsia-200 border-1 max-w-full p-10 object-contain" data-aos="fade-up" data-aos-duration="200">
                                <img src="/loghi/logogrigio.png" className='hover:scale-110 hover:rotate-3 transition-all duration-300' alt="" />
                            </div>
                        </div>
                    </section>
                    <hr />
                    {/* 3D */}
                    <section className="py-5 min-h-screen  overflow-hidden">
                        <div className="container mx-auto  overflow-visible">
                            <div className="text-center mb-16">
                                <h1 className='text-5xl tracking-tight md:text-8xl font-bold titolo-bianco py-5' data-aos="fade-up">
                                    Tecnologia 3D
                                </h1>
                                <p className="text-2xl md:text-2xl font-medium max-w-3xl mx-auto" data-aos="fade-up">
                                    Esplora le possibilità della tecnologia 3D nel web moderno.
                                    Il robot è stato integrato utilizzando React Three Fiber.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 items-start overflow-visible">


                                <div className="order-1 lg:order-2 overflow-visible">
                                    <div className="rounded-2xl  phone-3d-container mb-8">
                                        <RoboticHand3D />
                                    </div>
                                </div>

                                {/* <div className="order-2 ">
                            <div className=" rounded-2xl p-8 ">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
                                    {
                                        [
                                            {
                                                title: "Rotazione automatica e controlli manuali",
                                                icon: "text-bianco text-xl sm:text-2xl bi bi-arrow-clockwise",
                                            },
                                            {
                                                title: "Zoom e navigazione fluida",
                                                icon: "text-bianco text-xl sm:text-2xl bi bi-zoom-in",
                                            },
                                            {
                                                title: "Illuminazione realistica e ombre",
                                                icon: "text-bianco text-xl sm:text-2xl bi bi-palette",
                                            },
                                            {
                                                title: "Rendering ottimizzato per le performance",
                                                icon: "text-bianco text-xl sm:text-2xl bi bi-lightning",
                                            },
                                        ].map((feature, index) => (
                                            <div className="bg-gradient-to-br from-scuro/20 to-scuro/40 backdrop-blur-sm border-2 border-chiaro/20 rounded-xl p-4 sm:p-9 hover:from-scuro/30 hover:to-scuro/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-chiaro/10 relative" key={index}>
                                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-chiaro/10 rounded-full flex items-center justify-center absolute -top-8 left-1/2 -translate-x-1/2 bg-scuro-2 border-bianco border-2">
                                                    <i className={feature.icon}></i>
                                                </div>
                                                <div className="flex items-center justify-center text-center ">
                                                    <span className="text-bianco font-bold text-md sm:text-base lg:text-xl leading-tight">
                                                        {feature.title}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div> */}
                            </div>
                        </div>
                    </section>
                    <hr />
                    {/* progetti */}
                    <div className="py-16 ">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h1 className='text-5xl tracking-tight md:text-8xl font-bold titolo-bianco py-5' data-aos="fade-up">
                                    I Miei Progetti
                                </h1>
                                <p className="text-2xl md:text-2xl font-medium max-w-3xl mx-auto" data-aos="fade-up">
                                    Ecco alcuni dei miei progetti. Troverai delle anteprime per ogni tipo di device, una descrizione di come è stato creato.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto justify-center align-middle items-stretch" id='projects'>
                                {progetti.map((progetto, index) => (
                                    <div key={index} data-aos="fade-up">
                                        <CardAnteprimaProgetti
                                            title={progetto.title}
                                            description={progetto.description}
                                            imageUrl={progetto.imageUrl}
                                            link={progetto.link}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-16">
                                <BigButton text="PROGETTI" href="/progetti" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* competenze */}
                    <div className="py-16 ">
                        <div className="container mx-auto ">
                            <div className="text-center mb-16" data-aos="fade-up" >
                                <h1 className='text-5xl tracking-tight md:text-8xl font-bold titolo-bianco py-5'>
                                    Competenze
                                </h1>
                                <p className="text-2xl md:text-2xl font-medium max-w-3xl mx-auto px-5">
                                    Ecco una lista di alcune delle competenze che ho acquistato nello sviluppo web e che uso nel mio quotidiano.
                                </p>
                            </div>
                            <div className="">
                                {/* linguaggi */}
                                <Marquee pauseOnHover={true} speed={90} gradient={false} direction="">
                                    {loading ? (
                                        <div className="text-center py-10">
                                            <p className="text-2xl">Caricamento tecnologie...</p>
                                        </div>
                                    ) : tecnologie.length > 0 ? (
                                        // Duplica gli elementi per evitare spazi vuoti
                                        [...tecnologie, ...tecnologie, ...tecnologie].map((item, idx) => {
                                            // Standardizza gli SVG per uniformità
                                            let svgContent = item.svg_code || item.svg;
                                            if (svgContent) {
                                                // Rimuovi dimensioni esistenti e aggiungi quelle standardizzate
                                                svgContent = svgContent.replace(
                                                    /(width|height)="[^"]*"/g,
                                                    ''
                                                );
                                                // Aggiungi dimensioni uniformi
                                                svgContent = svgContent.replace(
                                                    '<svg',
                                                    `<svg width="75" height="75" `
                                                );
                                            }

                                            return (
                                                <div key={idx} className="carosello-item mx-10">
                                                    <div dangerouslySetInnerHTML={{ __html: svgContent }} />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-10">
                                            <p className="text-2xl">Nessuna tecnologia trovata</p>
                                            <p className="text-sm">Debug: {JSON.stringify(tecnologie)}</p>
                                        </div>
                                    )}
                                </Marquee>

                                <h3 className='text-3xl titolo-bianco md:text-3xl text-center font-bold py-5'>Linguaggi e Framework</h3>
                                {/* strumenti */}
                                <Marquee pauseOnHover={true} speed={90} gradient={false} >
                                    {loading ? (
                                        <div className="text-center py-10">
                                            <p className="text-2xl">Caricamento tools...</p>
                                        </div>
                                    ) : tools.length > 0 ? (
                                        // Duplica gli elementi per evitare spazi vuoti
                                        [...tools, ...tools, ...tools].map((item, idx) => {
                                            // Standardizza gli SVG per uniformità
                                            let svgContent = item.svg_code || item.svg;
                                            if (svgContent) {
                                                // Rimuovi dimensioni esistenti e aggiungi quelle standardizzate
                                                svgContent = svgContent.replace(
                                                    /(width|height)="[^"]*"/g,
                                                    ''
                                                );
                                                // Aggiungi dimensioni uniformi
                                                svgContent = svgContent.replace(
                                                    '<svg',
                                                    `<svg width="75" height="75" `
                                                );
                                            }

                                            return (
                                                <div key={idx} className="carosello-item mx-10">
                                                    <div dangerouslySetInnerHTML={{ __html: svgContent }} />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-10">
                                            <p className="text-2xl">Nessuna tecnologia trovata</p>
                                            <p className="text-sm">Debug: {JSON.stringify(tecnologie)}</p>
                                        </div>
                                    )}
                                </Marquee>
                                <h3 className='text-3xl titolo-bianco md:text-3xl text-center font-bold py-5'>Strumenti</h3>
                            </div>


                            <div className="text-center mt-16">
                                <BigButton text="COMPETENZE" href="/Competenze" />
                            </div>
                        </div>
                    </div >
                    <hr />
                    {/* collaborazioni */}
                    <div className="py-16 ">
                        <div className="container mx-auto ">
                            <div className="text-center " data-aos="fade-up">
                                <h1 className='text-5xl md:text-8xl tracking-tight font-bold titolo-bianco py-10'>
                                    Collaborazioni
                                </h1>
                                <div className="flex flex-col min-h-[600px]">
                                    <div className="grid grid-cols-1 bg-scuro-2 glass md:grid-cols-3 mx-auto justify-center py-5 px-10 items-center flex-1">
                                        <div className="flex content-center items-center justify-center">
                                            <img src="/loghi/logopurple.png" alt="" className="object-contain hover:scale-110 transition-all duration-300 linear" />
                                        </div>
                                        <div className="flex content-center items-center justify-center">
                                            <p className="text-6xl md:text-8xl titolo-bianco">+</p>
                                        </div>
                                        <div className="flex content-center items-center justify-center">
                                            <img src="immagini\6_files\Aurora logo_vettoriale copia.pdf-image-006-Photoroom.png" alt="" className="object-contain hover:scale-110 transition-all duration-300 linear" />
                                        </div>
                                    </div>
                                    {/* <div className="grid grid-cols-1 bg-chiaro-2 md:grid-cols-3 mx-auto justify-center py-5 px-10 items-center flex-1">
                                <div className="flex content-center items-center justify-center">
                                    <img src="immagini\\logo-mart-AoPqDR7a0WUaRZb0.avif" alt="" className="object-contain hover:scale-110 transition-all duration-300 size-80 md:size-58 lg:size-auto linear" />
                                </div>
                                <div className="flex content-center items-center justify-center">
                                    <p className="text-6xl md:text-8xl titolo-bianco">+</p>
                                </div>
                                <div className="flex content-center items-center justify-center">
                                    <img src="immagini\AVATAR\1-Photoroom.png" alt="" className="object-contain hover:scale-110 transition-all duration-300 linear" />
                                </div>
                            </div> */}
                                </div>
                            </div>
                            {/* aurora */}
                            <section className="glass py-10">
                                <div className="hidden lg:block">
                                    <p className="text-7xl md:text-8xl tracking-tight  titolo-bianco text-center">
                                        Jader
                                    </p>
                                    <p className="text-4xl md:text-6xl titolo-bianco text-center">
                                        +
                                    </p>
                                    <p className="text-7xl md:text-8xl  titolo-bianco text-center">
                                        Aurora
                                    </p>
                                </div>

                                <p className="text-2xl md:text-2xl px-10 md:px-20 mt-5 text-center ">
                                    Da oggi grazie alla collaborazione tra
                                    <span className="font-extrabold titolo-bianco text-xl md:text-2xl"> Jader </span>
                                    e
                                    <span className="font-extrabold titolo-bianco text-xl md:text-2xl"> Aurora </span> puoi avere un sito web con un AgentAI totalmente personalizzato, che svolge task quotidiane al posto tuo, 24/7, integrato dentro un sito costruito su misura per la tua attività!
                                </p>
                                <div className="text-center mt-16">
                                    <BigButton text="COLLABORAZIONI" href="/Collaborazioni" />
                                </div>
                            </section>
                            {/* martina */}
                            {/* <section className="bg-gradient-chiaro2 py-10">
                        <p className="text-7xl md:text-8xl tracking-tight titolo-bianco text-center">
                            Jader
                        </p>
                        <p className="text-4xl md:text-6xl titolo-bianco text-center">
                            +
                        </p>
                        <p className="text-7xl md:text-8xl  titolo-bianco text-center">
                            Martina
                        </p>

                        <p className="text-lg md:text-xl px-10 md:px-20 mt-5 text-center ">
                            Da oggi, grazie alla collaborazione tra <span className="font-extrabold titolo-bianco text-2xl">Jader</span> e <span className="font-extrabold titolo-bianco text-2xl">Martina</span>, puoi avere un sito web costruito su misura per la tua attività, con una grafica professionale e un'identità visiva unica che raccontano davvero chi sei.
                        </p>

                        <div className="text-center mt-16">
                            <BigButton text="COLLABORAZIONI" href="/Collaborazioni" />
                        </div>
                    </section> */}
                        </div>
                    </div >
                    <hr />
                    {/* recensioni */}
                    <div className="py-16 ">
                        <div className="container mx-auto ">
                            <div className="text-center mb-6">
                                <h1 className='text-5xl md:text-8xl font-bold titolo-bianco tracking-tight py-10' data-aos="fade-up">

                                </h1>
                                <h2 className='text-3xl md:text-5xl font-bold text-bianco tracking-tight'>
                                    Cosa dicono di me?
                                </h2>
                            </div>

                            {/* CTA per vedere le recensioni su Google */}
                            <div className="max-w-2xl mx-auto px-6 mb-12" data-aos="fade-up">
                                <div className="glass rounded-2xl p-8 md:p-12 border-2 border-chiaro/20 hover:border-chiaro/40 transition-all duration-300">
                                    <div className="text-center">
                                        <div className="mb-6">
                                            <i className="bi bi-star-fill text-chiaro text-5xl md:text-6xl mb-4"></i>
                                            <h3 className="text-2xl mt-2 md:text-3xl font-bold text-bianco mb-4">
                                                Recensioni Google
                                            </h3>
                                            <p className="text-lg md:text-xl text-bianco/80 font-medium mb-8">
                                                Scopri cosa dicono i miei clienti delle mie competenze e del lavoro svolto insieme.
                                            </p>
                                        </div>
                                        <a
                                            href="https://maps.app.goo.gl/fioodRQg38a4GG1X6"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cta mx-auto w-auto inline-block"
                                        >
                                            <span className="span">Recensioni</span>
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
                                </div>
                            </div>
                        </div>
                    </div >
                    <hr />
                    {/* contatti */}
                    <div className="py-16 ">
                        <div className="container mx-auto ">
                            <div className="text-center mb-16">
                                <h1 className='text-5xl md:text-8xl font-bold titolo-bianco tracking-tight py-10' data-aos="fade-up">
                                    Contatti
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 justify-center ">
                                    <div className="flex flex-col justify-center px-5">
                                        <p className="text-3xl md:text-3xl lg:text-4xl flex max-w-3xl text-center mb-5 mx-auto px-1" data-aos="fade-up">
                                            Puoi contattarmi direttamente tramite il mio Agent, fissando un appuntamento con Google Calendar. <br />
                                            O nel form nella sezione contatti.
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <img src="..//immagini/calendario.png" data-aos="zoom-in" alt="" className="object-contain rounded-circle md:max-h-100" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <p className="text-4xl md:text-4xl px-2 pt-5 text-center mb-8"  >Oppure tramite chiamata, email o social network</p>
                            <div className="flex justify-center gap-6  mx-auto px-6" >
                                {contatti.map((contatto, index) => {
                                    return (
                                        <a
                                            href={contatto.link}
                                            target="_blank"
                                            className="transition-all duration-300 hover:scale-105 hover:-translate-y-2 group"
                                            key={index}
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                        >
                                            <div className="text-center">
                                                <div className="flex items-center justify-center mx-auto mb-3 group-hover:bg-scuro-2 transition-colors duration-300">
                                                    <i className={`${contatto.icona} text-bianco text-2xl md:text-4xl lg:text-5xl`}></i>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <BigButton text="CONTATTAMI" href="/contatti" />
                        </div>
                    </div >

                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Home;

