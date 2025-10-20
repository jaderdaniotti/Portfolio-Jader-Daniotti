import React from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';

const Credits = () => {
  // Inizializza AOS
  React.useEffect(() => {
    Aos.init();
  }, []);

  const credits = [
    {
      title: "Cyber Core",
      author: "Tycho Magnetic Anomaly",
      url: "https://sketchfab.com/3d-models/cyber-core-d30920ccf2f440fa9586a656ac0f6bee",
      license: "CC Attribution",
    },
    {
      title: "Computer mouse A4Tech bloody V7",
      author: "Prokyovec",
      url: "https://sketchfab.com/3d-models/computer-mouse-a4tech-bloody-v7-69e3f3ec5cc44b14afaa85c53db09c1f",
      license: "CC Attribution",
    },
    {
      title: "Apple iPhone 15 Pro Max Black",
      author: "polyman Studio",
      url: "https://sketchfab.com/3d-models/apple-iphone-15-pro-max-black-df17520841214c1792fb8a44c6783ee7",
      license: "CC Attribution",
    },
    {
      title: "Laptop (Low Poly)",
      author: "Aullwen",
      url: "https://sketchfab.com/3d-models/laptop-7d870e900889481395b4a575b9fa8c3e",
      license: "CC Attribution",
    },
    {
      title: "Frontend Templates",
      author: "ThemeWagon",
      url: "https://themewagon.com/",
      license: "Free & Premium Templates",
    },
  ];

  return (
    <div className="min-h-screen bg-bianco inter text-scuro">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl inter font-bold mb-4">
            Ringraziamenti
          </h1>
          <p className="text-lg md:text-xl text-scuro/70 inter max-w-2xl mx-auto">
            Questo portfolio utilizza risorse e modelli 3D creati da artisti e sviluppatori. 
            Ecco i crediti completi per tutte le risorse utilizzate.
          </p>
        </div>

        {/* Credits List */}
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <div className="grid gap-6">
            {credits.map((credit, index) => (
              <div 
                key={index} 
                className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-scuro/10 "
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-scuro">
                      {credit.title}
                    </h3>
                    <p className="text-scuro/70 mb-1">
                      <span className="font-medium">Autore:</span> {credit.author}
                    </p>
                    <p className="text-scuro/70">
                      <span className="font-medium">Licenza:</span> {credit.license}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={credit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-scuro text-bianco rounded-lg hover:bg-scuro/80 transition-colors duration-300"
                    >
                      <i className="bi bi-box-arrow-up-right mr-2"></i>
                      Vai al link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-scuro/10">
            <p className="text-scuro/70 mb-4">
              Ringrazio tutti gli artisti e sviluppatori che hanno reso possibile questo portfolio 
              condividendo le loro risorse con licenze open source.
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
  );
};

export default Credits;
