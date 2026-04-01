import { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
function Footer() {
  let contatti = [
    {
      icona: "bi bi-linkedin",
      link: "https://www.linkedin.com/in/jader-daniotti-0a00b9328/",
    },
    { icona: "bi bi-github", link: "https://github.com/jaderdaniotti" },
    { icona: "bi bi-whatsapp", link: "https://wa.me/3513152008" },
    { icona: "bi bi-instagram", link: "https://www.instagram.com/jader_ness/" },
  ];
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 600,
      easing: "ease-out",
    });
  }, []);

  return (
    <footer className="footer sm:footer-horizontal bg-scuro-2 border-t border-white text-scuro items-center px-4 py-5">
      <nav className="grid-flow-col text-4xl gap-6 md:place-self-center md:justify-self-start">
        {contatti.map((contatto, index) => (
          <a
            href={contatto.link}
            className="text-bianco duration-300 hover:scale-110 transition-all hover:-translate-y-1"
            target="_blank"
            key={index}
          >
            <i className={contatto.icona}></i>
          </a>
        ))}
      </nav>

      <aside className="grid-flow-col gap-4 md:place-self-center text-lg md:justify-self-end flex items-center">
        <div className="flex flex-col gap-2">
          
          <div className="flex flex-col md:flex-row md:gap-4 gap-1">
            <Link
              to="/credits"
              target="_blank"
              className="text-bianco hover:text-bianco/70 font-medium md:text-end transition-colors duration-300 hover:underline"
            >
              Crediti
            </Link>
            <Link
              to="/privacy"
              className="text-bianco hover:text-bianco/70 font-medium md:text-end transition-colors duration-300 hover:underline"
            >
              Privacy
            </Link>
          </div>
          <p className="font-medium text-bianco">P.IVA <span className="font-semibold text-bianco">14494540967</span></p>
          <p className="text-bianco">Copyright © {new Date().getFullYear()} - All right reserved</p>
        </div>
        <img
          src="/loghi/logogrigio.png"
          alt=""
          className="w-12 h-12 md:w-20 md:h-20 rounded-full  hover:border-chiaro-2 transition-all duration-300 hover:scale-110 hover:rotate-3 cursor-pointer "
        />
      </aside>
    </footer>
  );
}

export default Footer;
