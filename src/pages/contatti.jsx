import { useNavigate } from "react-router-dom";
import BigButton from '../components/bigButton'
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti'
import Navbar from "../Navbar";
import Footer from "../Footer";
import CardServizi from "../components/cardServizi";
function Contatti() {
    let cardServizi = {
        studente: [
            {
                Titolo: "Studente",
                Descrizione: "Hai appena finito gli studi e vuoi farti notare sul mondo del web?",
                Pacchetti: [
                    {
                        Nome: "Base",
                        Servizi: [
                            "Sito portfolio semplice",
                            "Sezione contatti"
                        ],
                        Prezzo: "220"
                    },
                    {
                        Nome: "Standard",
                        Servizi: [
                            "Portfolio completo",
                            "CV e competenze",
                            "Progetti con immagini",
                            "Contatti con form"
                        ],
                        Prezzo: "380"
                    },
                    {
                        Nome: "Premium",
                        Servizi: [
                            "Portfolio avanzato con animazioni",
                            "Integrazione LinkedIn / GitHub",
                            "Download CV",
                            "SEO base + Google Analytics"
                        ],
                        Prezzo: "600"
                    }
                ]
            }
        ],
        freelancer: [
            {
                Titolo: "Freelancer",
                Descrizione: "Sei un professionista indipendente e vuoi mostrare i tuoi servizi?",
                Pacchetti: [
                    {
                        Nome: "Base",
                        Servizi: [
                            "Landing page professionale",
                            "Modulo contatto semplice"
                        ],
                        Prezzo: "250"
                    },
                    {
                        Nome: "Standard",
                        Servizi: [
                            "Landing con galleria progetti",
                            "Contatto avanzato con file upload"
                        ],
                        Prezzo: "450"
                    },
                    {
                        Nome: "Premium",
                        Servizi: [
                            "Standard + Calendario appuntamenti",
                            "Integrazione WhatsApp",
                            "SEO avanzata + blog"
                        ],
                        Prezzo: "650"
                    }
                ]
            }
        ],
        smallBusiness: [
            {
                Titolo: "Piccola Impresa",
                Descrizione: "Hai una piccola attività e vuoi portare la tua presenza online al livello successivo?",
                Pacchetti: [
                    {
                        Nome: "Base",
                        Servizi: [
                            "Sito one-page con info base",
                            "Mappa interattiva + contatti"
                        ],
                        Prezzo: "550"
                    },
                    {
                        Nome: "Standard",
                        Servizi: [
                            "Sito aziendale multi-pagina",
                            "Chi siamo, Servizi, Contatti"
                        ],
                        Prezzo: "850"
                    },
                    {
                        Nome: "Premium",
                        Servizi: [
                            "Tutto incluso nello Standard",
                            "Blog, SEO, Analytics, Chat",
                            "Google My Business"
                        ],
                        Prezzo: "1200"
                    }
                ]
            }
        ],
        artista: [
            {
                Titolo: "Artista/Creativo",
                Descrizione: "Vuoi far conoscere le tue opere e costruire un pubblico online?",
                Pacchetti: [
                    {
                        Nome: "Base",
                        Servizi: [
                            "Portfolio semplice",
                            "Sezione contatti"
                        ],
                        Prezzo: "240"
                    },
                    {
                        Nome: "Standard",
                        Servizi: [
                            "Portfolio dinamico",
                            "Blog artistico + social"
                        ],
                        Prezzo: "420"
                    },
                    {
                        Nome: "Premium",
                        Servizi: [
                            "Standard + Newsletter",
                            "Shop per opere",
                            "Modulo richieste personalizzate"
                        ],
                        Prezzo: "650"
                    }
                ]
            }
        ],
        ecommerce: [
            {
                Titolo: "Negozio Online",
                Descrizione: "Vuoi iniziare a vendere i tuoi prodotti online?",
                Pacchetti: [
                    {
                        Nome: "Base",
                        Servizi: [
                            "Catalogo prodotti",
                            "Carrello + checkout base"
                        ],
                        Prezzo: "750"
                    },
                    {
                        Nome: "Standard",
                        Servizi: [
                            "Gestione ordini",
                            "Integrazione pagamenti",
                            "Spedizione configurabile"
                        ],
                        Prezzo: "1100"
                    },
                    {
                        Nome: "Premium",
                        Servizi: [
                            "Standard + automazioni",
                            "Tracking spedizioni",
                            "Promozioni e codici sconto"
                        ],
                        Prezzo: "1500"
                    }
                ]
            }
        ]
    };

    let contatti = [
        { icona: `bi bi-envelope-at-fill`, link: "mailto:jaderdaniotti.lavoro@gmail.com" },
        { icona: `bi bi-phone`, link: "sms:+393513152008" },
        { icona: `bi bi-chat`, link: "tel:+393513152008" },
        { icona: `bi bi-linkedin`, link: "https://www.linkedin.com/in/jader-daniotti-0a00b9328/" },
        { icona: `bi bi-github`, link: "https://github.com/jaderdaniotti" },
        { icona: `bi bi-whatsapp`, link: "https://wa.me/3513152008" },
        { icona: `bi bi-instagram`, link: "https://www.instagram.com/jader_ness/" },
    ]

    return (
        <>
            <Navbar></Navbar>
            <div className="py-10 " id="indice">
                <h1 className="text-center text-6xl md:text-8xl py-20 titolo-bianco">CONTATTI</h1>
                <hr className='mb-10' />
                <div className="flex justify-evenly">
                    {contatti.map((contatto, index) => (
                        <a href={contatto.link} className="duration-300 text-4xl md:text-6xl hover:scale-110 transition-all hover:-translate-y-1" target="_blank" key={index}>
                            <i className={contatto.icona}></i>
                        </a>
                    ))}
                </div>
                <hr className='my-10' />
                <div className="px-4 py-8 flex flex-col gap-10">
                    {Object.entries(cardServizi).map(([chiave, valore]) => (
                        <section
                            key={chiave}
                            className="bg-chiaro-2 rounded-lg shadow-md p-6 space-y-4"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold text-bianco text-center mb-3">
                                {valore[0].Titolo}
                            </h2>
                            <p className=" text-center mb-6">
                                {valore[0].Descrizione}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-1">
                                {valore[0].Pacchetti.map((pkg, i) => (
                                    <CardServizi
                                        key={i}
                                        nome={pkg.Nome}
                                        servizi={pkg.Servizi}
                                        prezzo={pkg.Prezzo}
                                    />
                                ))}
                            </div>
                            <p className="text-center text-sm">*Ogni prezzo è indicativo e può variare in base alle richieste.</p>
                        </section>
                    ))}
                </div>
                <hr className='my-10' />
            </div>
            <Footer></Footer>
        </>
    )
}
export default Contatti