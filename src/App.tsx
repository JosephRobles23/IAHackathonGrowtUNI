import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import DocuCenter from './pages/docu-center';
import AOS from 'aos';
import 'aos/dist/aos.css';

function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();
  
  useEffect(() => {
    document.title = 'ProphetEstate AI | Intelligent Real Estate Advisor';
    
    // Inicializar AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 120,
    });
    
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-dark-bg font-sans transition-colors duration-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docu-center" element={<DocuCenter />} />
      </Routes>
    </div>
  );
}

export default App;