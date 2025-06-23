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
        <div className="py-10 " id="contattisection">
          <h1 className="text-center text-6xl md:text-8xl tracking-tight py-20 titolo-bianco">
            CONTATTI
          </h1>
          <hr className="mb-10" />
          <div className="flex justify-evenly">
            {contatti.map((contatto, index) => (
              <a
                href={contatto.link}
                className="duration-300 text-4xl md:text-6xl hover:scale-110 transition-all hover:-translate-y-1"
                target="_blank"
                key={index}
              >
                <i className={contatto.icona}></i>
              </a>
            ))}
          </div>
          <hr className="my-10" />
          <div className="px-4 py-8 flex flex-col gap-6">
            <h2 className="text-4xl md:text-6xl font-bold text-bianco tracking-tight text-center">
              Lavoriamo insieme!
            </h2>
            <p className="text-2xl md:text-4xl text-bianco text-center tracking-tight">
              Il mio profilo ti interessa? <br /> Scarica il mio cv per saperne
              ancora di più di me!
            </p>

            <a
              className="cta mx-auto w-auto"
              href="immagini\CV Jader Daniotti.pdf"
              download="CV Jader Daniotti"
            >
              <span className="span">CV</span>
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
          <hr className="my-10" />
          <div className="px-4  py-8 flex flex-col gap-10">
            <h2 className="text-4xl md:text-6xl font-bold text-bianco tracking-tight text-center">
              Creazione siti web
            </h2>
            {Object.entries(cardServizi).map(([chiave, valore]) => (
              <section
                key={chiave}
                className="bg-chiaro-2 rounded-lg shadow-md p-6 space-y-4"
              >
                <h2 className="text-4xl tracking-tight md:text-6xl font-bold text-bianco text-center mb-3">
                  {valore[0].Titolo}
                </h2>
                <p className=" text-center mb-6">{valore[0].Descrizione}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-2 xl:grid-cols-3 px-15 md:px-12 lg:px-20 xl:px-20">
                  {valore[0].Pacchetti.map((pkg, i) => (
                    <CardServizi
                      key={i}
                      nome={pkg.Nome}
                      servizi={pkg.Servizi}
                      prezzo={pkg.Prezzo}
                    />
                  ))}
                </div>
                <p className="text-center text-sm">
                  *Ogni prezzo è indicativo e può variare in base alle
                  richieste.
                </p>
              </section>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </>
    );
}
export default Contatti