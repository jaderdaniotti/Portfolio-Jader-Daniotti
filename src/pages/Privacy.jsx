import React from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Privacy = () => {
  // Inizializza AOS
  React.useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-bianco inter text-scuro">
        <Navbar />
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl inter font-bold mb-4">
              Informativa sulla Privacy
            </h1>
            <p className="text-lg md:text-xl text-scuro/70 inter max-w-2xl mx-auto">
              La presente informativa descrive come vengono trattati i dati personali 
              raccolti tramite questo sito web e i moduli di contatto.
            </p>
          </div>

          {/* Contenuto Privacy */}
          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-scuro/10 space-y-6">
              
              {/* Sezione Dati Raccolti */}
              <section>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-scuro">
                  Dati Raccolti
                </h2>
                <p className="text-scuro/80 leading-relaxed mb-4">
                  I dati raccolti tramite i moduli di contatto (nome, email, telefono) 
                  saranno utilizzati esclusivamente per ricontattare l'utente in merito 
                  alla richiesta effettuata.
                </p>
                <p className="text-scuro/80 leading-relaxed">
                  I dati non saranno ceduti a terzi e verranno trattati nel rispetto 
                  del Regolamento UE 2016/679 (GDPR).
                </p>
              </section>

              {/* Sezione Form Meta/Facebook */}
              <section className="pt-6 border-t border-scuro/10">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-scuro">
                  Form di Contatto Meta/Facebook
                </h2>
                <p className="text-scuro/80 leading-relaxed mb-4">
                  Qualora vengano utilizzati form di contatto integrati con Meta (Facebook), 
                  i dati raccolti tramite tali form (nome, email, telefono, messaggio) 
                  sono gestiti secondo le politiche sulla privacy di Meta.
                </p>
                <p className="text-scuro/80 leading-relaxed mb-4">
                  I dati ricevuti tramite i form Meta saranno utilizzati esclusivamente 
                  per rispondere alle richieste degli utenti e non saranno utilizzati 
                  per finalità di marketing diretto senza il consenso esplicito dell'utente.
                </p>
                <p className="text-scuro/80 leading-relaxed">
                  Per maggiori informazioni sul trattamento dei dati da parte di Meta, 
                  consulta la{' '}
                  <a 
                    href="https://www.facebook.com/privacy/policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-scuro underline hover:text-scuro/70 transition-colors"
                  >
                    Privacy Policy di Meta
                  </a>.
                </p>
              </section>

              {/* Sezione Titolare */}
              <section className="pt-6 border-t border-scuro/10">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-scuro">
                  Titolare del Trattamento
                </h2>
                <div className="bg-scuro/5 rounded-lg p-4 space-y-2">
                  <p className="text-scuro font-medium">
                    <span className="font-semibold">Titolare:</span> JaderWeb
                  </p>
                  <p className="text-scuro">
                    <span className="font-semibold">Email:</span>{' '}
                    <a 
                      href="mailto:jaderdaniotti.lavoro@gmail.com" 
                      className="text-scuro underline hover:text-scuro/70 transition-colors"
                    >
                      jaderdaniotti.lavoro@gmail.com
                    </a>
                  </p>
                </div>
              </section>

              {/* Sezione Diritti dell'Utente */}
              <section className="pt-6 border-t border-scuro/10">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-scuro">
                  Diritti dell'Utente
                </h2>
                <p className="text-scuro/80 leading-relaxed mb-4">
                  Ai sensi del GDPR, l'utente ha diritto di:
                </p>
                <ul className="list-disc list-inside space-y-2 text-scuro/80 ml-4">
                  <li>Accedere ai propri dati personali</li>
                  <li>Richiedere la rettifica dei dati inesatti</li>
                  <li>Richiedere la cancellazione dei dati</li>
                  <li>Opporsi al trattamento dei dati</li>
                  <li>Richiedere la limitazione del trattamento</li>
                  <li>Richiedere la portabilità dei dati</li>
                </ul>
                <p className="text-scuro/80 leading-relaxed mt-4">
                  Per esercitare questi diritti, è possibile contattare il titolare 
                  all'indirizzo email indicato sopra.
                </p>
              </section>

              {/* Sezione Conservazione Dati */}
              <section className="pt-6 border-t border-scuro/10">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-scuro">
                  Conservazione dei Dati
                </h2>
                <p className="text-scuro/80 leading-relaxed">
                  I dati personali raccolti verranno conservati per il tempo necessario 
                  a rispondere alle richieste degli utenti e, comunque, non oltre il 
                  periodo previsto dalla normativa vigente.
                </p>
              </section>

            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12">
            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-scuro/10">
              <p className="text-scuro/70 mb-4">
                Per qualsiasi domanda o richiesta relativa al trattamento dei dati personali, 
                non esitare a contattarci.
              </p>
              <Link 
                to="/" 
                className="inline-flex text-bianco items-center px-6 py-3 bg-scuro rounded-lg hover:bg-scuro/80 transition-colors duration-300"
              >
                <i className="bi bi-arrow-left mr-2"></i>
                Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;

