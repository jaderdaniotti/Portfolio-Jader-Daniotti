import Navbar from "../Navbar"
import Footer from "../Footer"
import CardServizi from "../components/cardServizi";

function Servizi() {
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
                        Prezzo: "220",
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
                Titolo: "Artista",
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
    return (
        <>
            <Navbar></Navbar>
            <div className="py-10 px-5">
                <h1 className="text-center text-4xl md:text-7xl lg:text-8xl tracking-tight titolo-bianco">
                    SERVIZI
                </h1>
            </div>
            <hr className="mb-10 " />
            <div className="px-2   py-8 flex flex-col gap-10">
                <h2 className="text-6xl md:text-6xl font-bold text-bianco tracking-tight text-center">
                    Creazione siti web
                </h2>
                {Object.entries(cardServizi).map(([chiave, valore]) => (
                    <section
                        key={chiave}
                        className="bg-chiaro-2 rounded-lg shadow-md py-10  md:px- space-y-4"
                    >
                        <h2 className="text-5xl tracking-tight md:text-6xl font-bold text-bianco px-5 text-center mb-3">
                            {valore[0].Titolo}
                        </h2>
                        <p className="px-5 text-xl font-medium  text-center mb-6">{valore[0].Descrizione}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-2 xl:grid-cols-3 px-8 md:px-12 lg:px-20 xl:px-20">
                            {valore[0].Pacchetti.map((pkg, i) => (
                                <CardServizi
                                    key={i}
                                    nome={pkg.Nome}
                                    servizi={pkg.Servizi}
                                    prezzo={pkg.Prezzo}
                                    href="" />
                            ))}
                        </div>
                        {/* <p className="text-center text-sm">
                                *Ogni prezzo è indicativo e può variare in base alle
                                richieste.
                            </p> */}
                    </section>
                ))}
            </div>

            <Footer></Footer>
        </>
    )
}

export default Servizi