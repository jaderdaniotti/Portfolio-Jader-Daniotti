import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => setIsOpen(false);
    const LINK = [
        { href: "/", text: "Home" },
        { href: "/LandingPage", text: "OP" },
        { href: "/work", text: "Work"},
        // { href: "/Chisono", text: "Jader" },
        { href: "/progetti", text: "Progetti" },
        { href: "/Competenze", text: "Competenze" },
        // { href: "/Collaborazioni", text: "Collaborazioni" },
        { href: "/Contatti", text: "Contatti" },
        // { href: "/Servizi", text: "Servizi" },
    ];

    // Funzione per verificare se un link è attivo
    const isActive = (href) => {
        if (href === "/") {
            return location.pathname === "/";
        }
        // Per /progetti, controlla anche se il path inizia con /progetti (include /progetti/:id)
        if (href === "/progetti") {
            return location.pathname.startsWith("/progetti");
        }
        return location.pathname === href || location.pathname.startsWith(href + "/");
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed z-[999] top-0 left-0 right-0 w-full bg-chiaro-2 transition-all duration-300 ${scrolled ? 'shadow-lg py-1' : ' py-2'
                }` }>
                <div className="container mx-auto px-4 flex items-center justify-between relative">
                    <div className="flex-shrink-0">
                        <Link to="/admin">
                            <img
                                src="/loghi/logoviola.png"
                                alt="Jader"
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full  transition-all duration-300 hover:scale-110 hover:-rotate-3 cursor-pointer "
                            />
                        </Link>
                    </div>
                    <ul className="hidden md:flex items-center font-medium md:text-md lg:text-xl absolute left-1/2 -translate-x-1/2">
                        {LINK.map((item, index) => {
                            const active = isActive(item.href);
                            return (
                                <li key={index} className="relative group">
                                    <Link
                                        to={item.href}
                                        className={`text-md lg:text-lg hover:text-scuro transition-all duration-300 hover:scale-105 block py-2 px-3 rounded-lg  ${
                                            item.admin ? 'text-red-600 font-semibold' : 'text-grigio'
                                        }`}
                                    >
                                        {item.text}
                                    </Link>
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-grigio transition-all duration-300 ${
                                        active 
                                            ? 'w-full' 
                                            : 'w-0 group-hover:w-full'
                                    }`}></span>
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-0.5 w-6 bg-bianco transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''
                            }`}></span>
                        <span className={`block h-0.5 w-6 bg-bianco transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''
                            }`}></span>
                        <span className={`block h-0.5 w-6 bg-bianco transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''
                            }`}></span>
                    </button>
                    {/* Overlay */}
                    {isOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-50 md:hidden"
                            onClick={() => setIsOpen(false)}
                        ></div>
                    )}
                    <div className={`fixed top-0 right-0 h-full w-screen max-w bg-chiaro shadow-2xl transform transition-transform duration-700 linear z-50 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}>
                        <div className="flex justify-between items-center px-5 border-b text-scuro">
                            <Link to="/admin" onClick={handleLinkClick}>
                                <img
                                    src="/loghi/logopurple.png"
                                    alt="Avatar"
                                    className="w-25 h-25 rounded-full "
                                />
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2  hover:bg-chiaro-2/10 text-bianco rounded-full transition-colors duration-200"
                                aria-label="Close menu"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="50"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-scuro"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="py-6 ">
                            <ul className="align-center flex flex-col items-center gap-4">
                                {LINK.map((item, index) => {
                                    const active = isActive(item.href);
                                    return (
                                        <li key={index}>
                                            <Link to={item.href}
                                                onClick={handleLinkClick}
                                                className={`block px-6 py-2 text-3xl md:text-2xl w-min border-b-2 hover:translate-x-1 transition-all font-medium duration-300 linear ${
                                                    active 
                                                        ? 'text-scuro underline decoration-2 underline-offset-4' 
                                                        : item.admin 
                                                            ? 'text-red-600 font-bold' 
                                                            : 'text-scuro'
                                                }`}
                                            >
                                                {item.text}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;