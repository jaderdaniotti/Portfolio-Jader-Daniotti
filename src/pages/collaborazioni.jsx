import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CardServizi from "../components/cardServizi";

function Collaborazioni() {
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
  let servizi = {
    grafica: [
      {
        Titolo: "Grafica",
        Descrizione: "lorem ipsum lorem lorem ipsum ",
        Pacchetti: [
          "Loghi", "Banner", "Carte di presentazione", "Flyer"
        ]
      },
    ],
    sviluppo: [
      {
        Titolo: "Sviluppo Web",
        Descrizione: "lorem ipsum lorem lorem ipsum ",
        Pacchetti: [
          "Landing page", "Portfolio", "Blog", "E-commerce"
        ]
      },
    ],
    AgentAI: [
      {
        Titolo: "AgentAI",
        Descrizione: "lorem ipsum lorem lorem ipsum ",
        Pacchetti: [
          "Agent AI istruito tramite file personalizzati", "Chatbot per sito", "Chatbot per app", "Attivo 24/7"
        ]
      },
    ]
  };
  return (
    <>
      <Navbar />
      {/* titolo */}
      <div className="py-10 px-5" id="">
        <h1 className="text-center text-4xl md:text-7xl lg:text-8xl tracking-tight titolo-bianco">
          COLLABORAZIONI
        </h1>
      </div>
      <hr className="mb-10" />
      {/* diff */}
      <figure className="diff aspect-16/9 " tabIndex={0}>
        <div className="diff-item-1" role="img" tabIndex={0}>
          <div className="bg-chiaro text-scuro grid place-content-center text-6xl md:text-8xl lg:text-9xl font-black">
            AURORA
          </div>
        </div>
        <div className="diff-item-2" role="img">
          <div className="bg-scuro text-chiaro grid place-content-center text-6xl md:text-8xl lg:text-9xl">
            MARTINA
          </div>
        </div>
        <div className="diff-resizer"></div>
      </figure>
      <hr className="my-10" />
      {/* immagini */}
      <section id="intro" className="flex flex-col justify-center items-center">
        <div className="px-5 grid grid-cols-1 sm:grid-cols-3 justify-center items-center">
          <div className="flex justify-center">
            <a
              href="https://www.graphicsmarti.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="immagini\\logo-mart-AoPqDR7a0WUaRZb0.avif"
                alt=""
                className="size-70 object-contain"
              />
            </a>
          </div>
          <div className="flex justify-center">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="immagini\\AVATAR\\1-Photoroom.png"
                alt=""
                className="size-70 object-contain"
              />
            </a>
          </div>
          <div className="flex justify-center">
            <a
              href="https://www.auroratechnologies.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="immagini\\Aurora logo_vettoriale copia.pdf-image-002-Photoroom.png"
                alt=""
                className="size-70 object-contain"
              />
            </a>
          </div>
        </div>
      </section>
      <hr className="my-10" />
      {/* cosa offriamo */}
      <section>
        <h2 className="mt-3 text-5xl text-center md:text-5xl lg:text-6xl">
          Cosa offriamo?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-2 xl:grid-cols-3 px-15 md:px-12 lg:px-20 xl:px-20 mt-5">
          {Object.values(servizi)
            .flat()
            .map((categoria, index) => (
              <CardServizi
                key={index}
                nome={categoria.Titolo}
                servizi={categoria.Pacchetti}
                href="/Contatti"
              ></CardServizi>
            ))}
        </div>
      </section>
      <hr className="my-5" />
      {/* servizi */}
      <section>
        {/* Grafica */}
        <section className="flex flex-col justify-center px-5 items-center">
          <h2 className="mt-3 text-4xl md:text-6xl flex items-center font-semibold">
            GRAFICA
          </h2>
          <ul className="text-center mt-2 px-5">
            <li className="text-2xl md:text-4xl">
              <h5 className="mt-3 font-medium tracking-tight">
                Identità Visiva
              </h5>
              <p className="text-lg md:text-2xl mt-1 font-normal">
                Trasformo la tua storia in un design che emoziona, creando un’immagine visiva che ti rappresenti al meglio.
              </p>
            </li>
            <li className="text-2xl md:text-4xl">
              <h5 className="mt-3 font-medium tracking-tight">
                Design Personalizzato
              </h5>
              <p className="text-lg md:text-2xl mt-1 font-normal">
                Niente template: realizzo grafiche su misura, pensate per valorizzare davvero la tua identità.
              </p>
            </li>
            <li className="text-2xl md:text-4xl">
              <h5 className="mt-3 font-medium tracking-tight">
                Collaborazione Creativa
              </h5>
              <p className="text-lg md:text-2xl mt-1 font-normal">
                Ti affianco in ogni passo, dalla brand identity ai contenuti, per una comunicazione efficace e coerente.
              </p>
            </li>
          </ul>

          <div className="mt-5 flex flex-col justify-center px-5 items-center">
            <h3 className="text-3xl md:text-5xl mb-2 mt-3 font-medium tracking-tight titolo-bianco">Sito web</h3>
            <img
              src="immagini\www.graphicsmarti.com_.png"
              className="object-contain size-200 h-min rounded-xl"
              alt=""
            />
            <a
              href="https://www.graphicsmarti.com/"
              target="_blank"
              className="btn bg-bianco font-medium mt-3 text-xl px-10 text-scuro-2 rounded-4xl text-md"
            >
              <i className="bi  bi-link"></i>
              Link web
            </a>
          </div>
        </section>
        <hr className="my-5" />
        {/* Agent ai */}
        <section className="flex flex-col justify-center px-5 mb-5 items-center">
          <h2 className="mt-3 text-4xl md:text-6xl flex items-center font-semibold">
            AGENT AI
          </h2>
          <ul className="text-center mt-2 px-5">
            <li className="text-2xl md:text-4xl">
              <h5 className="mt-3 font-medium tracking-tight">
                Identità dell'Agent
              </h5>
              <p className="text-lg md:text-2xl mt-1 font-normal">
                Creo un'identità visiva unica per il tuo AI Agent, rendendolo riconoscibile,
                coerente e memorabile. Dall'avatar alla palette colori, ogni dettaglio comunica
                chi è il tuo assistente virtuale.
              </p>
            </li>
            <li className="text-2xl md:text-4xl">
              <h5 className="mt-3 font-medium tracking-tight">
                Pensato per te
              </h5>
              <p className="text-lg md:text-2xl mt-1 font-normal">
                L'Agent AI non è stato pensato solo per essere un plus, è stato pensato anche per farti risparmiare tempo facendo task professionali al posto tuo, istruito da te, 24/7. 
              </p>
            </li>
            <li className="text-2xl md:text-4xl">
              <h5 className="mt-3 font-medium tracking-tight">
                Comunicazione Umana + AI
              </h5>
              <p className="text-lg md:text-2xl mt-1 font-normal">
                Lavoriamo insieme per costruire una comunicazione armonica tra te, il tuo pubblico
                e l'AI. Dalla definizione del tone of voice alla creazione di contenuti social e visual,
                tutto è pensato per dare vita a un Agent davvero utile e umano.
              </p>
            </li>
          </ul>

          <div className="mt-5 flex flex-col justify-center px-5 items-center">
            <h3 className="text-3xl md:text-5xl mb-2 mt-3 font-medium tracking-tight titolo-bianco">Sito web</h3>
            <img
              src="immagini\www.itsaurora.ai_dashboard.png"
              className="object-contain size-200 h-min rounded-xl"
              alt=""
            />
            <a
              href="https://www.itsaurora.ai/"
              target="_blank"
              className="btn bg-bianco font-medium mt-3 text-xl px-10 text-scuro-2 rounded-4xl text-md"
            >
              <i className="bi  bi-link"></i>
              Link web
            </a>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Collaborazioni;