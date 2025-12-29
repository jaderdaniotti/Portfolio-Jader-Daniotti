
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from 'react';
import GlobalLoader from './components/GlobalLoader';
import ScrollToTop from './components/ScrollToTop';
// import FloatingDashboardButton from "./components/FloatingDashboardButton";
import { useUmamiTracking } from './utils/umami';

// Lazy loading delle pagine per migliorare le performance
const Home = lazy(() => import('./pages/home'));
const Progetti = lazy(() => import('./pages/progetti'));
const ProgettoDettaglio = lazy(() => import('./pages/ProgettoDettaglio'));
const Collaborazioni = lazy(() => import('./pages/collaborazioni'));
const Chisono = lazy(() => import('./pages/chisono'));
const Competenze = lazy(() => import('./pages/competenze'));
const Contatti = lazy(() => import('./pages/contatti'));
const Servizi = lazy(() => import('./pages/servizi'));
const Admin = lazy(() => import('./pages/Admin'));
const Work = lazy(() => import('./pages/Work'));
const LandingPage = lazy(() => import('./pages/landingPage'));
const Credits = lazy(() => import('./pages/Credits'));

// Componente di fallback durante il caricamento delle pagine
const PageLoader = () => (
  <div className="fixed inset-0 z-50 bg-scuro flex items-center justify-center">
    <div className="loader"></div>
  </div>
);

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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/work' element={<Work />} />
              <Route path='/chisono' element={<Chisono />} />
              <Route path='/collaborazioni' element={<Collaborazioni />} />
              <Route path='/competenze' element={<Competenze />} />
              <Route path='/contatti' element={<Contatti />} />
              <Route path='/servizi' element={<Servizi />} />
              <Route path="/progetti" element={<Progetti />} />
              <Route path="/progetti/:id" element={<ProgettoDettaglio />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/landingpage" element={<LandingPage />} />
            </Routes>
          </Suspense>
          {/* <FloatingDashboardButton /> */}
        </BrowserRouter>
      )}
    </>
  )
}

export default App
