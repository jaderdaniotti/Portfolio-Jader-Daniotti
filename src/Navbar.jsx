import { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-chiaro text-scuro px-2 py-1 rounded-bottom shadow fixed w-full shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Avatar */}
                
                <img src="immagini/AVATAR/1-Photoroom.png" alt="" className="position-absolute left-0 w-16 h-16 rounded-full hover:scale-120 ease-in duration-300 hover:-rotate-3" />

                {/* Menu Desktop */}
                <ul className="hidden md:flex gap-x-6 text-xl">
                    <li className="hover:scale-105 ease-in duration-300 "><a href="#home">Home</a></li>
                    <li className="hover:scale-105 ease-in duration-300"><a href="#about">Chi sono?</a></li>
                    <li className="hover:scale-105 ease-in duration-300"><a href="#projects">Progetti</a></li>
                    <li className="hover:scale-105 ease-in duration-300"><a href="#contact">Contatti</a></li>
                </ul>
        <>

                {/* Menu Mobile Icon */}
                <button className="md:hidden text-3xl" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
                {/* Menu Mobile */}
                <div className={`fixed top-0 left-0 h-screen w-screen bg-chiaro text-scuro shadow-neutral-800 border-3 p-10 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden z-50 overflow-scroll` }>
                    <button className="md:hidden position-absolute top-0 right-0 text-3xl" onClick={() => setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <hr className="my-5 mb-10"/>
                    <ul className="flex flex-col items-center  gap-10 text-4xl">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">Chi sono?</a></li>
                        <li><a href="#projects">Progetti</a></li>
                        <li><a href="#contact">Contatti</a></li>
                    <img src="immagini/AVATAR/1-Photoroom.png"/>
                    </ul>
                </div>
        </>

            </div>
        </nav>
    );
}

export default Navbar;
