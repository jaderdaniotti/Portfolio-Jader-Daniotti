import { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import SEOHead from '../components/SEOHead';

function Contatti() {
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [message, setMessage] = useState('');
  const [nome, setNome] = useState('');


  let contatti = [
    { 
      icona: `bi bi-envelope-at-fill`, 
      link: "mailto:jaderdaniotti.lavoro@gmail.com",
      name: "Email",
      description: "Scrivimi una email"
    },
    { 
      icona: `bi bi-phone`, 
      link: "tel:+393513152008",
      name: "Telefono",
      description: "Chiamami direttamente"
    },
    { 
      icona: `bi bi-chat`, 
      link: "sms:+393513152008",
      name: "SMS",
      description: "Mandami un messaggio"
    },
    { 
      icona: `bi bi-linkedin`, 
      link: "https://www.linkedin.com/in/jader-daniotti-0a00b9328/",
      name: "LinkedIn",
      description: "Connettiamoci"
    },
    { 
      icona: `bi bi-whatsapp`, 
      link: "https://wa.me/3513152008",
      name: "WhatsApp",
      description: "Chatta con me"
    },
    { 
      icona: `bi bi-instagram`, 
      link: "https://www.instagram.com/jader_ness/",
      name: "Instagram",
      description: "Seguimi"
    },
  ]

  return (
    <>
      <SEOHead 
        title="Contatti - Jader Daniotti | Contattami per Progetti Web"
        description="Contatta Jader Daniotti per progetti web e collaborazioni. Email, telefono, WhatsApp, LinkedIn e Instagram. Scarica il CV e iniziamo a lavorare insieme!"
        keywords="contatti, email, telefono, WhatsApp, LinkedIn, Instagram, CV, curriculum vitae, progetti web"
      />
      <Navbar></Navbar>
      {/* <div className="py-10 " id="contattisection">
        <h1 className="text-center text-6xl md:text-8xl tracking-tight titolo-bianco">
          CONTATTI
        </h1>
      </div>
      <hr className="mb-10" /> */}
      {/* <div className="px-6 py-8">
        <p className="text-xl px-10 md:px-20 md:text-4xl font-bold text-bianco tracking-tight text-center">
          Scegli il modo per entrare in contatto.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl py-10 mx-auto">
          {contatti.map((contatto, index) => (
            <a
              href={contatto.link}
              className=" rounded-xl p-8 transition-all duration-300 hover:scale-95 hover:-translate-y-2 group linear"
              target="_blank"
              key={index}
            >
              <div className="text-center">
                <div className="bg-scuro rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-scuro-2 transition-colors duration-300">
                  <i className={`${contatto.icona} text-bianco text-3xl`}></i>
                </div>
                <h3 className="text-bianco font-normal text-2xl mb-2 group-hover:text-scuro-2 transition-colors duration-300">
                  {contatto.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div> */}
      
      {/* Form Personalizzato con Tabs */}
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-bianco tracking-tight text-center mb-8">
          Cosa aspetti? <span className="italic">Contattami!</span>
        </h2>
        
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 px-3">
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 py-1 rounded-lg font-semibold text-md transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'whatsapp'
                ? 'bg-chiaro text-scuro shadow-lg scale-105'
                : 'bg-scuro-2 text-bianco hover:bg-scuro hover:scale-100'
            }`}
          >
            <i className="bi bi-whatsapp text-2xl"></i>
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveTab('sms')}
            className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'sms'
                ? 'bg-chiaro text-scuro shadow-lg scale-105'
                : 'bg-scuro-2 text-bianco hover:bg-scuro hover:scale-100'
            }`}
          >
            <i className="bi bi-chat-dots text-2xl"></i>
            <span>SMS</span>
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'email'
                ? 'bg-chiaro text-scuro shadow-lg scale-105'
                : 'bg-scuro-2 text-bianco hover:bg-scuro hover:scale-100'
            }`}
          >
            <i className="bi bi-envelope-at-fill text-2xl"></i>
            <span>Email</span>
          </button>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-scuro/20 to-scuro/40 backdrop-blur-sm border border-chiaro/20 rounded-xl p-6 sm:p-8">
          <div className="space-y-8 relative">
            {/* Campo Nome (solo per Email) */}
            {activeTab === 'email' && (
              <div>
                <label className="block text-bianco py-1 mb-2 absolute -top-3 -left-3 bg-scuro-2 z-99 px-3 text-xl font-light text-bianco rounded-lg border border-chiaro/20">
                  Nome
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-scuro-2 border border-chiaro/20 text-bianco placeholder-chiaro/50 focus:outline-none focus:ring-2 focus:ring-chiaro/50 focus:border-transparent transition-all font-normal pt-8"
                />
              </div>
            )}

            {/* Campo Messaggio */}
            <div className="relative">
              <label className="block text-bianco py-1 mb-2 absolute -top-3 -left-3 bg-scuro-2 z-99 px-3 text-xl font-light text-bianco rounded-lg border border-chiaro/20">
                Messaggio
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-scuro-2 border border-chiaro/20 text-bianco placeholder-chiaro/50 focus:outline-none focus:ring-2 focus:ring-chiaro/50 focus:border-transparent transition-all resize-none font-normal pt-8"
              />
            </div>

            {/* Bottone Invia */}
            <button
              onClick={() => {
                if (!message.trim()) {
                  alert('Per favore, inserisci un messaggio');
                  return;
                }

                const encodedMessage = encodeURIComponent(message.trim());
                let link = '';

                if (activeTab === 'whatsapp') {
                  link = `https://wa.me/3513152008?text=${encodedMessage}`;
                } else if (activeTab === 'sms') {
                  link = `sms:+393513152008?body=${encodedMessage}`;
                } else if (activeTab === 'email') {
                  const subject = encodeURIComponent('Contatto dal Portfolio');
                  const emailBody = nome.trim()
                    ? encodeURIComponent(`Ciao Jader,\n\n${message.trim()}\n\nCordiali saluti,\n${nome.trim()}`)
                    : encodedMessage;
                  link = `mailto:jaderdaniotti.lavoro@gmail.com?subject=${subject}&body=${emailBody}`;
                }

                if (link) {
                  window.open(link, '_blank');
                }
              }}
              className="w-full py-4 px-6 bg-chiaro text-scuro font-medium text-lg rounded-lg hover:bg-chiaro/90 transition-all duration-300 hover:scale-98 hover:shadow-lg hover:shadow-chiaro/20 flex items-center justify-center gap-2"
            >
              <span>Invia</span>
            </button>

            {/* Info */}
            <p className="text-chiaro/70 text-sm font-normal text-center">
              {activeTab === 'whatsapp' &&
                'Cliccando su "Invia", si aprirà WhatsApp con il tuo messaggio già compilato.'}
              {activeTab === 'sms' &&
                'Cliccando su "Invia", si aprirà l\'app Messaggi con il tuo messaggio già compilato (solo su mobile).'}
              {activeTab === 'email' &&
                'Cliccando su "Invia", si aprirà la tua app email con il messaggio già compilato.'}
            </p>
          </div>
        </div>
      </div>
{/* 
      <hr className="my-10" />
      <div className="px-4 py-8 flex flex-col gap-6">
        <h2 className="text-4xl md:text-6xl font-bold text-bianco tracking-tight text-center">
          Lavoriamo insieme!
        </h2>
        <p className="text-2xl md:text-4xl text-bianco font-medium text-center tracking-tight">
          Il mio profilo ti interessa? <br /> Scarica il mio cv per saperne
          ancora di più di me!
        </p>

        <a
          className="cta mx-auto w-auto"
          href="immagini\CURRICULUM VITAE JADER DANIOTTI GIUGNO.pdf"
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
      </div> */}

      {/* Sezione Certificati */}
      <hr className="my-10" />
      <div className="px-4 py-8">
        <h2 className="text-4xl md:text-6xl font-bold text-bianco tracking-tight text-center mb-8">
          I Miei Certificati
        </h2>
        <p className="text-xl md:text-2xl text-bianco font-medium text-center tracking-tight mb-12 max-w-4xl mx-auto">
          Ecco i certificati dei corsi di programmazione che ho completato. 
          Questi attestano le mie competenze e il mio impegno nell'apprendimento continuo.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Primo Certificato */}
          <div className="bg-scuro-2 rounded-lg p-6 shadow-xl border border-gray-700">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.credential.net/embed/f52ddb24-da77-405a-bfda-84cb94a59dcf"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
                title="Certificato Corso di Programmazione"
              >
              </iframe>
            </div>
          </div>

          {/* Secondo Certificato */}
          <div className="bg-scuro-2 rounded-lg p-6 shadow-xl border border-gray-700">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.credential.net/embed/542f41ff-b55f-4a6f-8dcf-3502cba73654"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
                title="Certificato Corso di Programmazione Avanzato"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-10" />

      <Footer></Footer>
    </>
  );
}
export default Contatti