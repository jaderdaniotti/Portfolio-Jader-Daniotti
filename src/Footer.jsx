import { useState, useEffect } from "react";
import Aos from 'aos';
function Footer() {

    Aos.init()
    return (
        <footer className="footer sm:footer-horizontal bg-chiaro text-scuro items-center p-4">

            <nav className="grid-flow-col text-3xl gap-6 md:place-self-center md:justify-self-start">
                <a href="" className="duration-300 hover:scale-110 transition-all hover:-translate-y-1">
                    <i className="bi bi-facebook " ></i>
                </a>
                <a href="" className="duration-300 hover:scale-110 transition-all hover:-translate-y-1">
                    <i className="bi bi-instagram " ></i>
                </a>
                <a href="" className="duration-300 hover:scale-110 transition-all hover:-translate-y-1">
                    <i className="bi bi-linkedin " ></i>
                </a>
                <a href="" className="duration-300 hover:scale-110 transition-all hover:-translate-y-1">
                    <i className="bi bi-github " ></i>
                </a>
                <a href="" className="duration-300 hover:scale-110 transition-all hover:-translate-y-1">
                    <i className="bi bi-whatsapp " ></i>
                </a>
            </nav>
            <aside className="grid-flow-col gap-4 md:place-self-center text-lg md:justify-self-end flex items-center">
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                <img src="immagini/AVATAR/1-Photoroom.png" alt="" className="w-12 h-12 md:w-20 md:h-20 rounded-full  hover:border-chiaro-2 transition-all duration-300 hover:scale-110 hover:rotate-3 cursor-pointer " />
            </aside>
        </footer>
    );
}

export default Footer;
