import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    document.title = 'ProphetEstate AI | Intelligent Real Estate Advisor';
    
    // Inicializar AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      offset: 120,
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-dark-bg font-sans transition-colors duration-200">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default App