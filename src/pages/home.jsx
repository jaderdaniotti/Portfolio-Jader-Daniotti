import { useState, useEffect } from "react";
import BigButton from '../components/bigButton'
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti'
import Navbar from "../Navbar";
import Footer from "../Footer";
import Marquee from "react-fast-marquee";
import SEOHead from '../components/SEOHead';
import RoboticHand3D from '../components/RoboticHand3D';
import { portfolioAPI, supabase } from '../config/supabase';

// Componente per le recensioni con gestione errori immagini e nuovo stile CSS
function ReviewCard({ review }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="text-scuro px-5 bg-bianco rounded-lg py-5 ">
            <div className="flex items-center max-w-3/4 gap-3 mb-4">
                {review.profile_photo_url && !imageError ? (
                    <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-scuro-2 flex items-center justify-center border border-chiaro/20">
                        <i className="bi bi-person-fill text-chiaro text-xl"></i>
                    </div>
                )}
                <div>
                    <p className="font-bold text-2xl ">{review.author_name}</p>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <i
                                key={i}
                                className={`bi bi-star${i < review.rating ? '-fill' : ''}  text-sm`}
                            ></i>
                        ))}
                    </div>
                </div>
            </div>
            <p className="font-normal text-md leading-relaxed mb-3">{review.text}</p>
            {review.relative_time_description && (
                <p className="text-chiaro/50 text-lg mt-2 font-medium italic text-end ">{review.relative_time_description}</p>
            )}
        </div>
    );
}

// Componente carosello per le recensioni
function ReviewsCarousel({ reviews }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!reviews || reviews.length === 0) {
        return null;
    }

    // Mostra massimo 5 recensioni
    const displayReviews = reviews.slice(0, 5);
    const totalReviews = displayReviews.length;

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % totalReviews);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
    };

    const goToReview = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full">
            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {displayReviews.map((review, index) => (
                        <div key={index} className="min-w-full flex justify-center px-4">
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Controlli di navigazione */}
            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={prevReview}
                    className="w-10 h-10 rounded-full bg-chiaro text-scuro flex items-center justify-center hover:bg-chiaro/90 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Recensione precedente"
                >
                    <i className="bi bi-chevron-left text-xl"></i>
                </button>

                {/* Indicatori */}
                <div className="flex gap-2">
                    {displayReviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToReview(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-chiaro w-8'
                                    : 'bg-chiaro/40 w-3 hover:bg-chiaro/60'
                                }`}
                            aria-label={`Vai alla recensione ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextReview}
                    className="w-10 h-10 rounded-full bg-chiaro text-scuro flex items-center justify-center hover:bg-chiaro/90 transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Recensione successiva"
                >
                    <i className="bi bi-chevron-right text-xl"></i>
                </button>
            </div>

            {/* Contatore recensioni */}
            <p className="text-center text-chiaro/70 text-sm mt-4">
                {currentIndex + 1} / {totalReviews}
            </p>
        </div>
    );
}

function Home() {

    const [tecnologie, setTecnologie] = useState([]);
    const [tools, setTools] = useState([]);
    const [progetti, setProgetti] = useState([]);
    const [loading, setLoading] = useState(true);
    const [placeData, setPlaceData] = useState(null);
    const [placeLoading, setPlaceLoading] = useState(true);
    const [placeError, setPlaceError] = useState(null);

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

    // Fetch dati Google Places API tramite Netlify Function (per evitare CORS)
    useEffect(() => {
        const fetchPlaceDetails = async () => {
            const apiKey = import.meta.env.VITE_PLACE_API_KEY;
            const placeId = 'ChIJMztRE1A7ekcR6OOrrT5YyuA';

            if (!apiKey) {
                console.warn('VITE_PLACE_API_KEY non configurata nel file .env');
                setPlaceLoading(false);
                return;
            }

            try {
                // Usa il proxy di Vite per evitare problemi CORS
                const fields = [
                    'name',
                    'formatted_address',
                    'formatted_phone_number',
                    'international_phone_number',
                    'opening_hours',
                    'rating',
                    'user_ratings_total',
                    'reviews',
                    'website',
                    'url',
                    'photos'
                ].join(',');

                const proxyUrl = `/api/google-places/place/details/json?place_id=${placeId}&fields=${fields}&key=${encodeURIComponent(apiKey)}`;

                const response = await fetch(proxyUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.status === 'OK' && data.result) {
                    setPlaceData(data.result);
                } else {
                    console.error('Errore Google Places API:', data.status, data.error_message);
                    setPlaceError(data.error_message || 'Errore nel caricamento dei dati');
                }
            } catch (error) {
                console.error('Errore nella fetch Google Places:', error);
                setPlaceError('Errore nel caricamento delle informazioni');
            } finally {
                setPlaceLoading(false);
            }
        };

        fetchPlaceDetails();
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
            <SEOHead
                title="Jader Daniotti - Fullstack Developer & Web Designer | Portfolio"
                description="Portfolio di Jader Daniotti - Fullstack Developer specializzato in Frontend, UI/UX, Web Design e soluzioni digitali personalizzate. Scopri i progetti, le competenze e i servizi."
                keywords="Jader Daniotti, Fullstack Developer, Web Design, UI/UX, Frontend, Portfolio, Sviluppo Web, React, Laravel, PHP, JavaScript, HTML, CSS"
            />
            <Navbar />
            {/* hero */}
            <div className="hero h-screen relative" id='home'>
                <div className="absolute hidden xl:block left-0">
                    <img src="/loghi/saluto.png" alt="" className="w-3/4 h-full object-cover" />
                </div>
                <div className="hero-content text-center">
                    <div className="max-w-md py-10 ">
                        <p className="text-6xl tracking-tight md:text-7xl" data-aos="zoom-in" data-aos-duration="500">Ciao!</p>
                        <p className="text-7xl tracking-tight md:text-8xl" data-aos="zoom-in" data-aos-duration="500">Sono</p>
                        <h1 className="titolo-bianco tracking-tight text-8xl md:text-9xl " data-aos="zoom-in" data-aos-duration="500">Jader
                        </h1>
                        <p className="py-6 text-3xl font-medium text-bianco" >
                            Fullstack Developer con una preferenza verso il Frontend.
                        </p>
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
                            <div className="grid grid-cols-1 bg-scuro-2 md:grid-cols-3 mx-auto justify-center py-5 px-10 items-center flex-1">
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
                    <section className="bg-gradient-scuro2 py-10">
                        <p className="text-7xl md:text-8xl tracking-tight  titolo-bianco text-center">
                            Jader
                        </p>
                        <p className="text-4xl md:text-6xl titolo-bianco text-center">
                            +
                        </p>
                        <p className="text-7xl md:text-8xl  titolo-bianco text-center">
                            Aurora
                        </p>

                        <p className="text-lg md:text-xl px-10 md:px-20 mt-5 text-center ">
                            Da oggi grazie alla collaborazione tra <span className="font-extrabold titolo-bianco text-2xl">Jader</span> e <span className="font-extrabold titolo-bianco text-2xl">Aurora</span> puoi avere un sito web con un AgentAI totalmente personalizzato, che svolge task quotidiane al posto tuo, 24/7, integrato dentro un sito costruito su misura per la tua attività!
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
            {/* Jader */}
            <div className="py-16 ">
                <div className="container mx-auto ">
                    <div className="text-center mb-3">
                        <h1 className='text-5xl md:text-8xl font-bold titolo-bianco tracking-tight py-10' data-aos="fade-up">
                            Jader
                        </h1>
                        <h2 className='text-3xl md:text-5xl font-bold text-bianco tracking-tight'>
                            Cosa dicono di me?
                        </h2>
                        <h3 className='text-xl md:text-2xl font-medium italic text-bianco mt-3 tracking-tight'>
                            Queste sono le ultime 5 recensioni lasciate da clienti che hanno lavorato con me, prese da Google.
                        </h3>
                    </div>

                    {/* Sezione Google Places - Informazioni Attività */}
                    {placeLoading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-chiaro"></div>
                            <p className="text-bianco text-xl mt-4">Caricamento informazioni...</p>
                        </div>
                    )}

                    {placeError && (
                        <div className="text-center py-8">
                            <p className="text-red-400 text-lg">Impossibile caricare le informazioni dell'attività</p>
                        </div>
                    )}

                    {placeData && !placeLoading && (
                        <div className="max-w-5xl mx-auto px-6 mb-12" data-aos="fade-up">
                            <div className=" rounded-2xl p-8 md:p-12l">
                                {placeData.reviews && placeData.reviews.length > 0 && (
                                    <div>
                                        <ReviewsCarousel reviews={placeData.reviews} />
                                    </div>
                                )}

                                {placeData.photos && placeData.photos.length > 0 && (
                                    <div className="mt-8 pt-8 border-t border-chiaro/20">
                                        <h3 className="text-2xl font-bold text-bianco mb-4 flex items-center gap-2">
                                            <i className="bi bi-images text-chiaro"></i>
                                            Foto
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {placeData.photos.slice(0, 4).map((photo, index) => (
                                                <a
                                                    key={index}
                                                    href={placeData.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="relative overflow-hidden rounded-lg aspect-square group"
                                                >
                                                    <img
                                                        src={`/api/google-places/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${encodeURIComponent(import.meta.env.VITE_PLACE_API_KEY)}`}
                                                        alt={`${placeData.name} - Foto ${index + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-scuro/0 group-hover:bg-scuro/20 transition-colors duration-300"></div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto px-6" >
                        {contatti.map((contatto, index) => {
                            return (
                                <a
                                    href={contatto.link}
                                    target="_blank"
                                    className=" rounded-lg p-6  transition-all duration-300 hover:scale-105 hover:-translate-y-2 group"
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="text-center">
                                        <div className="bg-scuro rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:bg-scuro-2 transition-colors duration-300">
                                            <i className={`${contatto.icona} text-bianco text-2xl`}></i>
                                        </div>
                                        <h3 className="text-bianco font-normal text-2xl mb-2 group-hover:text-scuro-2 transition-colors duration-300">
                                            {contatto.name}
                                        </h3>
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
        </>
    )
}

export default Home;

