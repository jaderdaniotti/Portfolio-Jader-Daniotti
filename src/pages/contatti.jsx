import { useNavigate } from "react-router-dom";
import BigButton from '../components/bigButton'
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti'
import Navbar from "../Navbar";
import Footer from "../Footer";
function Contatti(){
    return(
        <>
        <Navbar></Navbar>
        <div>
            <h1>Contatti</h1>
        </div>
        <Footer></Footer>
        </>
    )
}
export default Contatti