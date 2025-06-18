import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Footer from './Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import Progetti from './pages/progetti'
import Collaborazioni from './pages/collaborazioni';
import Chisono from './pages/chisono';
import Competenze from './pages/competenze';
import Contatti from './pages/contatti';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/Chisono' element={<Chisono />} />
        <Route path='/Collaborazioni' element={<Collaborazioni />} />
        <Route path='/Competenze' element={<Competenze />} />
        <Route path='/Contatti' element={<Contatti />} />
        <Route path="/progetti" element={<Progetti />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
