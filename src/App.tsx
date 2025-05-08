import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { supabase } from './lib/supabase-client';

// Componente para rutas protegidas
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('ProtectedRoute: Verificando autenticación...');
        const { data } = await supabase.auth.getSession();
        const authenticated = !!data.session;
        console.log('ProtectedRoute: Usuario autenticado:', authenticated);
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error("ProtectedRoute: Error al verificar la autenticación:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    console.log('ProtectedRoute: Cargando...');
    // Puedes mostrar un spinner o un mensaje de carga aquí
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  console.log('ProtectedRoute: Renderizando, autenticado:', isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

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
        <Route 
          path="/docu-center" 
          element={
            <ProtectedRoute>
              <DocuCenter />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;