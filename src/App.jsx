
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import GlobalLoader from './components/GlobalLoader';
import Home from './pages/home'
import Progetti from './pages/progetti'
import Collaborazioni from './pages/collaborazioni';
import Chisono from './pages/chisono';
import Competenze from './pages/competenze';
import Contatti from './pages/contatti';
import Servizi from "./pages/servizi";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <GlobalLoader onLoadingComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/chisono' element={<Chisono />} />
            <Route path='/collaborazioni' element={<Collaborazioni />} />
            <Route path='/competenze' element={<Competenze />} />
            <Route path='/contatti' element={<Contatti />} />
            <Route path='/servizi' element={<Servizi />} />
            <Route path="/progetti" element={<Progetti />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
