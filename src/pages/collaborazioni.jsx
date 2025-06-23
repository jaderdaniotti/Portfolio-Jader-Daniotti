import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Collaborazioni() {

  return (
    <>
      <Navbar />
      <div className="py-10" id="contattisection">
        <h1 className="text-center text-4xl md:text-7xl lg:text-8xl tracking-tight py-20 titolo-bianco">
          COLLABORAZIONI
        </h1>
        <hr className="my-10" />
        <figure className="diff aspect-16/9" tabIndex={0}>
          <div className="diff-item-1" role="img" tabIndex={0}>
            <div className="bg-chiaro text-scuro grid place-content-center text-7xl lg:text-9xl font-black">
              AURORA
            </div>
          </div>
          <div className="diff-item-2" role="img">
            <div className="bg-scuro text-chiaro grid place-content-center text-7xl lg:text-9xl">
              MARTINA
            </div>
          </div>
          <div className="diff-resizer"></div>
        </figure>
        <hr className="my-10" />
        <section
          id="intro"
          className="flex flex-col justify-center items-center"
        >
          <div className="px-5 grid grid-cols-1 sm:grid-cols-3 justify-center items-center">
            <div className="flex justify-center">
              <a href="https://www.graphicsmarti.com/" target="_blank" rel="noopener noreferrer">
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
              <a href="https://www.auroratechnologies.ai/" target="_blank" rel="noopener noreferrer">
                <img
                  src="immagini\\Aurora logo_vettoriale copia.pdf-image-002-Photoroom.png"
                  alt=""
                  className="size-70 object-contain"
                />
              </a>
            </div>
          </div>
          <h2 className="mt-3 text-3xl md:text-5xl lg:text-6xl">
            Cosa offriamo?
          </h2>
          <div className="my-10  flex items-center justify-center ">
            
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Collaborazioni;