import { useNavigate } from "react-router-dom";
import BigButton from '../components/bigButton'
import CardAnteprimaProgetti from '../components/cardAnteprimaProgetti'
import Navbar from "../Navbar";
import Footer from "../Footer";
function Chisono(){
    return(
        <>
        <Navbar></Navbar>
        <div>
            <h1>Chi sono</h1>
        </div>
        <Footer></Footer>
        </>
    )
}
export default Chisono