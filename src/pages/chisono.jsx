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
                        <a href="" className="p-3 hover:scale-120 hover:translate-y-1  transition-all duration-300">
                            <i className="bi-eye text-2xl"></i>
                        </a>
                    </li>

                    <li className="list-row">
                        <div className="text-4xl self-center font-thin opacity-30 tabular-nums">02</div>
                        <div><img className="size-15 rounded-box" src="immagini\AVATAR\9.png" /></div>
                        <div className="list-col-grow flex items-center font-semibold text-xl">
                            <div>La partenza</div>
                        </div>
                        <a href="" className="p-3 hover:scale-120 hover:translate-y-1  transition-all duration-300">
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
            </div>
            <Footer></Footer>
        </>
    )
}
export default Chisono