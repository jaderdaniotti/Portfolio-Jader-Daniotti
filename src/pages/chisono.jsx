import { useNavigate } from "react-router-dom";
import BigButton from '../components/bigButton'
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti'
import Navbar from "../Navbar";
import Footer from "../Footer";
function Chisono() {
    return (
        <>
            <Navbar></Navbar>
            <div className="py-10 px-5">
                <h1 className="text-center text-8xl titolo-bianco">JADER</h1>
                <ul className="list mt-5 bg-chiaro-2 shadow rounded-box ">
                    <li className="p-4 pb-2 text-2xl  opacity-60 tracking-wide">Il mio percorso</li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">01</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\1-Photoroom.png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>Chi sono?</div>
                        </div>
                        <a href="#aboutme" className="p-3 hover:scale-120 hover:translate-y-1  transition-all duration-300">
                            <i className="bi-eye text-2xl"></i>
                        </a>
                    </li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">02</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\9.png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>La partenza</div>
                        </div>
                        <a href="#partenza" className="p-3 hover:scale-120 hover:translate-y-1  transition-all duration-300">
                            <i className="bi-eye text-2xl"></i>
                        </a>
                    </li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">03</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\11-Photoroom.png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>Il lavoro</div>
                        </div>
                        <a href="" className="p-3 hover:scale-120 hover:translate-y-1  transition-all duration-300">
                            <i className="bi-eye text-2xl"></i>
                        </a>
                    </li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">04</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\4-Photoroom (1).png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>Dev-Mode</div>
                        </div>
                        <a href="" className="p-3 hover:scale-120 hover:translate-y-1  transition-all duration-300">
                            <i className="bi-eye text-2xl"></i>
                        </a>
                    </li>

                </ul>
                <hr className="my-10" />
                <section className="flex flex-col" id="aboutme">
                    <h2 className="text-center mb-5 text-5xl md:text-6xl ">Chi sono?</h2>
                    <img src="immagini\AVATAR\10-Photoroom.png" alt="" className="mb-5 h-100 object-contain" />
                    <p className=" text-3xl  md:text-4xl text-chiaro">
                        Ciao! Mi chiamo
                        <span className="titolo-bianco font-extrabold"> Jader </span>
                        e ti do il benvenuto sul mio sito web.
                    </p>
                    <p className=" text-3xl md:text-4xl text-chiaro">
                        Sono quel tipo di persona a cui piacciono le <span className="titolo-bianco font-extrabold"> sfide </span>, quel tipo di persona a cui piace imparare sempre cose nuove, prendendo spunto da ciò che mi circonda.
                    </p>
                    <p className=" text-3xl md:text-4xl text-chiaro">
                        Se sei arrivato in questa sezione del sito vuol dire che non sei solo interessato al mio lato <span className="titolo-bianco font-extrabold"> professionale </span>, ma di conoscermi veramente, cercherò di farti fare un idea di me!
                    </p>
                </section>
                <hr className="my-10" />
                <section className="flex flex-col" id="partenza">
                    <h2 className="text-center mb-5 text-5xl md:text-6xl ">La partenza</h2>
                    <img src="immagini\AVATAR\9.png" alt="" className="mb-5 h-100 object-contain" />
                    <p className=" text-3xl  md:text-4xl text-chiaro">
                        Ho cominciato il mio percorso alle superiori, in un CFP &#40;Corso di Formazione Professionale&#41;. <br />
                        A quell'età non avevo ancora in mente quello che volevo fare da grande, volevo solo buttarmi sul lavoro il prima possibile e ho fatto 3 anni su 5 in alternanza scuola lavoro. 
                    </p>
                    <p className=" text-3xl md:text-4xl text-chiaro">
                        A 18 anni, stanco della vita che stavo facendo, mi viene offerta un occasione d'oro, quella di partire per un altro stato, in compagnia di un amico.
                    </p>
                    <p className=" text-3xl md:text-4xl text-chiaro">
                        Senza troppo pensarci su, tempo qualche settimana di organizzare i documenti, preparare i vestiti e salutare tutti, mi ritrovo in Francia, più precisamente a Fontaine, periferia di Grenoble, Rhone Alpes.
                    </p>
                </section>
                <hr className="my-10" />
            </div>
            <Footer></Footer>
        </>
    )
}
export default Chisono