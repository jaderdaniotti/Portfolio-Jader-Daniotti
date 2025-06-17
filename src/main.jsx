import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'aos/dist/aos.css'
import Aos from 'aos'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
Aos.init();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar></Navbar>
    <App />
    <Footer></Footer>
  </StrictMode>,
)
