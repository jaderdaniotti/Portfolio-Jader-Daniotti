import { useState, useEffect } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => setIsOpen(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <nav className={`sticky top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
            scrolled ? 'bg-chiaro shadow-lg py-2' : 'bg-chiaro py-4'
        }`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <img 
                        src="immagini/AVATAR/1-Photoroom.png" 
                        alt="Avatar" 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full  transition-all duration-300 hover:scale-110 hover:-rotate-3 cursor-pointer "
                    />
                </div>

                {/* Menu Desktop */}
                <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
                    {[
                        { href: "#home", text: "Home" },
                        { href: "#about", text: "Chi sono?" },
                        { href: "#projects", text: "Progetti" },
                        { href: "#contact", text: "Contatti" }
                    ].map((item, index) => (
                        <li key={index} className="relative group">
                            <a 
                                href={item.href}
                                className="text-scuro text-xl hover:text-scuro font-semibold transition-all duration-300 hover:scale-105 block py-2 px-3 rounded-lg hover:bg-chiaro-2/10"
                            >
                                {item.text}
                            </a>
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-scuro transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        </li>
                    ))}
                </ul>

                {/* Hamburger Menu Button */}
                <button 
                    className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-0.5 w-6 bg-chiaro-2 transition-all duration-300 ${
                        isOpen ? 'rotate-45 translate-y-0.5' : ''
                    }`}></span>
                    <span className={`block h-0.5 w-6 bg-chiaro-2 transition-all duration-300 mt-1 ${
                        isOpen ? 'opacity-0' : ''
                    }`}></span>
                    <span className={`block h-0.5 w-6 bg-chiaro-2 transition-all duration-300 mt-1 ${
                        isOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}></span>
                </button>

                {/* Overlay */}
                {isOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-50 md:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Menu Mobile */}
                <div className={`fixed top-0 right-0 h-full w-screen max-w bg-chiaro shadow-2xl transform transition-transform duration-700 linear z-50 md:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <div className="flex justify-between items-center p-6 border-b border-chiaro-2">
                        <img 
                            src="immagini/AVATAR/1-Photoroom.png" 
                            alt="Avatar" 
                            className="w-12 h-12 rounded-full "
                        />
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-chiaro-2/10 rounded-full transition-colors duration-200"
                            aria-label="Close menu"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
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

                    <div className="py-6">
                        <ul className="space-y-2">
                            {[
                                { href: "#home", text: "Home" },
                                { href: "#about", text: "Chi sono?" },
                                { href: "#projects", text: "Progetti" },
                                { href: "#contact", text: "Contatti" }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className="block px-6 py-4 text-xl text-scuro font-semibold hover:text-scuro hover:bg-chiaro-2/10 transition-all  border-l-4 border-transparent hover:border-scuro hover:transform hover:scale-105 duration-300"
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="text-center text-sm text-scuro">
                            © 2025 Jader Daniotti.
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
