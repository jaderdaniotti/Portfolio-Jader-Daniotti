import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Footer from './Footer'
import BigButton from './components/bigButton'
import CardAnteprimaProgetti from './components/cardAnteprimaProgetti'


function App() {

  return (
    <>

      <div className="hero h-screen" id='home'>
        <div className="hero-content text-center">
          <div className="max-w-md py-10">
            <p className="text-7xl" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="500">Ciao!</p>
            <p className="text-8xl" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="500">Sono</p>
            <h1 className="titolo-bianco text-9xl" data-aos="zoom-in" data-aos-delay="800" data-aos-duration="500">Jader</h1>
            <p className="py-6 text-2xl " data-aos="zoom-in" data-aos-delay="200" data-aos-duration="500">
              Fullstack Developer con una preferenza verso il Frontend.
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 align-center items-center justify-center  px-5 py-5 w-full text-center" id='chi-sono'>
          <div className="text-center flex-col py-10">
            <h1 className="titolo-bianco text-7xl" data-aos="zoom-in" >Chi sono?</h1>
            <p className="py-6 text-3xl" data-aos="zoom-in" >
              Ciao a tutti, mi chiamo Jader Daniotti, sono un appassionato di <br /> <span className='text-chiaro'>Web Design</span>, <br /> <span className='text-chiaro'>UI/UX</span> e <br /><span className='text-chiaro'>Programmazione</span>.
            </p>
            <BigButton text="CONOSCIMI" href={"#chi-sono"}></BigButton>
          </div>
          <div className=" max-w-full p-10 object-contain" data-aos="fade-up" data-aos-delay="200" data-aos-duration="500">
            <img src="immagini\AVATAR\1-Photoroom.png" className='shadow shadow-fuchsia-200 rounded-full border-fuchsia-200 border-1' alt="" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="500" />
          </div>
        </div>
      </div>
      <hr />
      <div className="py-5">
        <h1 className='text-center text-7xl py-5 titolo-bianco'>Progetti</h1>
        <div className="grid grid-cols-1 gap-5 px-5 py-5" id='projects'>
          <CardAnteprimaProgetti title={"Progetto 1"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia."} imageUrl={"immagini/ANTEPRIME/JDEAM.png"} link={"#"} linkProgetto={""}></CardAnteprimaProgetti>
          <CardAnteprimaProgetti title={"Progetto 1"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia."} imageUrl={"https://placeimg.com/640/480/any"} link={"#"} linkProgetto={""}></CardAnteprimaProgetti>
          <CardAnteprimaProgetti title={"Progetto 1"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia."} imageUrl={"https://placeimg.com/640/480/any"} link={"#"} linkProgetto={""}></CardAnteprimaProgetti>
          <CardAnteprimaProgetti title={"Progetto 1"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia."} imageUrl={"https://placeimg.com/640/480/any"} link={"#"} linkProgetto={""}></CardAnteprimaProgetti>
          <CardAnteprimaProgetti title={"Progetto 1"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia."} imageUrl={"https://placeimg.com/640/480/any"} link={"#"} linkProgetto={""}></CardAnteprimaProgetti>
        </div>
      </div>
      <hr />
    </>
  )
}

export default App
