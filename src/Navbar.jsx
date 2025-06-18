import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    
    const navigate = useNavigate();
    const handleLinkClick = () => setIsOpen(false);
    const LINK = [
        { href: "/", text: "Home" },
        { href: "/Chisono", text: "Jader" },
        { href: "/progetti", text: "Progetti" },
        { href: "/Collaborazioni", text: "Collaborazioni" },
        { href: "/Competenze", text: "Competenze" },
        { href: "/Contatti", text: "Contatti" },
    ];
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
        <nav className={`sticky top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-chiaro shadow-lg py-1' : 'bg-chiaro py-4'
            }`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex-shrink-0">
                    <img
                        src="immagini/AVATAR/1-Photoroom.png"
                        alt="Avatar"
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full  transition-all duration-300 hover:scale-110 hover:-rotate-3 cursor-pointer "
                    />
                </div>
                <ul className="hidden md:flex items-center gap-1 font-medium">
                    {LINK.map((item, index) => (
                        <li key={index} className="relative group">
                            <Link
                                to={item.href}
                                className="text-scuro text-lg hover:text-scuro  transition-all duration-300 hover:scale-105 block py-2 px-3 rounded-lg hover:bg-chiaro-2/10"
                            >
                                {item.text}
                            </Link>
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-scuro transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        </li>
                    ))}
                </ul>
                <button
                    className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-0.5 w-6 bg-chiaro-2 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''
                        }`}></span>
                    <span className={`block h-0.5 w-6 bg-chiaro-2 transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''
                        }`}></span>
                    <span className={`block h-0.5 w-6 bg-chiaro-2 transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''
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
                    <div className="flex justify-between items-center p-6 border-b border-chiaro-2">
                        <img
                            src="immagini/AVATAR/1-Photoroom.png"
                            alt="Avatar"
                            className="w-25 h-25 rounded-full "
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-chiaro-2/10 rounded-full transition-colors duration-200"
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
                                className="text-chiaro-2"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="py-6 ">
                        <ul className="align-center flex flex-col items-center gap-4">
                            {LINK.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.href}
                                        onClick={handleLinkClick}
                                        className="block px-6 py-2 text-4xl text-scuro w-min border-b-2 border-violet-950 hover:translate-x-1 transition-all font-medium duration-300 linear "
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="text-center text-2xl text-scuro">
                            © 2025 Jader Daniotti.
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;
