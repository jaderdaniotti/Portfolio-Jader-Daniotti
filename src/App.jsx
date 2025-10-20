
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import GlobalLoader from './components/GlobalLoader';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home'
import Progetti from './pages/progetti'
import Collaborazioni from './pages/collaborazioni';
import Chisono from './pages/chisono';
import Competenze from './pages/competenze';
import Contatti from './pages/contatti';
import Servizi from "./pages/servizi";
import Admin from "./pages/Admin";
import Work from "./pages/Work";
import Credits from "./pages/Credits";
import FloatingDashboardButton from "./components/FloatingDashboardButton";
import { useUmamiTracking } from './utils/umami';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Inizializza il tracking Umami
  useUmamiTracking();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <GlobalLoader onLoadingComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/work' element={<Work />} />
            <Route path='/chisono' element={<Chisono />} />
            <Route path='/collaborazioni' element={<Collaborazioni />} />
            <Route path='/competenze' element={<Competenze />} />
            <Route path='/contatti' element={<Contatti />} />
            <Route path='/servizi' element={<Servizi />} />
            <Route path="/progetti" element={<Progetti />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/credits" element={<Credits />} />
          </Routes>
          <FloatingDashboardButton />
        </BrowserRouter>
      )}
    </>
  )
}

export default App
