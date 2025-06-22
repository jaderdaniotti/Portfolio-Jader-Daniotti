import { useState, useEffect } from "react";
import Aos from 'aos';
function Footer() {
    let contatti = [
        { icona: "bi bi-linkedin", link: "https://www.linkedin.com/in/jader-daniotti-0a00b9328/" },
        { icona: "bi bi-github", link: "https://github.com/jaderdaniotti" },
        { icona: "bi bi-whatsapp", link: "https://wa.me/3513152008" },
        { icona: "bi bi-instagram", link: "https://www.instagram.com/jader_ness/" },
        
    ]
    Aos.init()
    return (
        <footer className="footer sm:footer-horizontal bg-chiaro text-scuro items-center px-4 py-5">

            <nav className="grid-flow-col text-4xl gap-6 md:place-self-center md:justify-self-start">
                {contatti.map((contatto, index) => (
                    <a href={contatto.link} className="duration-300 hover:scale-110 transition-all hover:-translate-y-1" target="_blank" key={index}>
                        <i className={contatto.icona} ></i>
                    </a>
                ))}
            </nav>
            <aside className="grid-flow-col gap-4 md:place-self-center text-lg md:justify-self-end flex items-center">
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                <img src="immagini/AVATAR/1-Photoroom.png" alt="" className="w-12 h-12 md:w-20 md:h-20 rounded-full  hover:border-chiaro-2 transition-all duration-300 hover:scale-110 hover:rotate-3 cursor-pointer " />
            </aside>
        </footer>
    );
}

export default Footer;
