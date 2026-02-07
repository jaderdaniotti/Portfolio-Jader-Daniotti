import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti'
import Navbar from "../Navbar";
import Footer from "../Footer";
import SEOHead from '../components/SEOHead';
import { supabase } from '../config/supabase';
import GlobalLoader from '../components/GlobalLoader';

function Progetti() {
    const navigate = useNavigate();
    const [progetti, setProgetti] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carica solo i dati dei progetti (senza immagini)
    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                
                // Fetch solo i dati dei progetti
                const { data: projectsData, error: projectsError } = await supabase
                    .from('projects')
                    .select('id, title, description, cover_image, order_index, domain_url')
                    .order('order_index', { ascending: true })
                    .limit(12);

                if (projectsError) {
                    console.error('Errore nel caricamento progetti:', projectsError);
                }

                setProgetti(projectsData || []);
            } catch (error) {
                console.error('Errore nel caricamento progetti:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    // Naviga alla pagina di dettaglio del progetto
    const handleProjectClick = (projectId) => {
        navigate(`/progetti/${projectId}`);
    };

    if (loading) {
        return (
            <>
                <SEOHead
                    title="Progetti - Jader Daniotti | Siti Web Udine e Friuli"
                    description="Progetti di creazione siti web a Udine e in Friuli."
                />
                <Navbar />
                <div className="min-h-screen bg-scuro-2 flex flex-col items-center justify-center">
                    <GlobalLoader />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <SEOHead
                title="Progetti - Jader Daniotti | Siti Web Udine e Friuli"
                description="Progetti di creazione siti web realizzati da Jader Daniotti per clienti a Udine, Gemona del Friuli, Solaro e in Friuli."
                keywords="progetti siti web udine, portfolio jader daniotti, siti web friuli, realizzazioni web designer udine"
            />
            <Navbar></Navbar>

            <div className="py-10 pt-20 md:pt-24" id="indice">
                <h1 className="text-center text-6xl md:text-8xl titolo-bianco">PROGETTI</h1>
                            </div>
            <hr className='mb-10' />
            
           
            {/* Grid progetti */}
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:px-8 px-2 items-stretch" id='projects'>
                {progetti.map((progetto) => (
                    <div key={progetto.id} className="flex flex-col h-full">
                        <div onClick={() => handleProjectClick(progetto.id)} className="cursor-pointer h-full">
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

            <Footer></Footer>
        </>
    )
}

export default Progetti
