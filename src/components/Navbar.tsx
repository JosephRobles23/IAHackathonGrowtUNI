import React, { useState, useEffect } from 'react';
import { Building2, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from './ui/Link';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'react-i18next';
import LoginModal from './LoginModal';
import UserMenu from './UserMenu';
import { supabase, UserData } from '../lib/supabase-client';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'signIn' | 'signUp'>('signIn');
  const [user, setUser] = useState<UserData | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si estamos en la página DocuCenter
  const isDocuCenter = location.pathname === '/docu-center';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Efecto para verificar si el usuario está autenticado
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user as UserData);
        } else {
          setUser(null);
          // Redirigir al inicio si el usuario cierra sesión y está en DocuCenter
          if (window.location.pathname === '/docu-center') {
            navigate('/');
          }
        }
      }
    );
    
    // Verificar el estado de autenticación al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user as UserData);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const openLogin = (tab: 'signIn' | 'signUp') => {
    setActiveTab(tab);
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  // Función para manejar la navegación a secciones
  const handleNavigation = (sectionId: string) => {
    if (isDocuCenter) {
      // Si estamos en DocuCenter, navegar a la página principal y agregar el hash
      // Usamos window.location directamente para garantizar la redirección
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Si ya estamos en la página principal, solo cerrar el menú móvil
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white dark:bg-dark-bg shadow-md dark:shadow-soft-dark py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DepaseoX</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isDocuCenter ? (
                // Si estamos en DocuCenter, usar botones en lugar de Links
                <>
                  <button 
                    className="text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    onClick={() => handleNavigation('features')}
                  >
                    {t('nav.features')}
                  </button>
                  <button 
                    className="text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    onClick={() => handleNavigation('how-it-works')}
                  >
                    {t('nav.howItWorks')}
                  </button>
                  <button 
                    className="text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    onClick={() => handleNavigation('testimonials')}
                  >
                    {t('nav.testimonials')}
                  </button>
                  <button 
                    className="text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                    onClick={() => handleNavigation('pricing')}
                  >
                    {t('nav.pricing')}
                  </button>
                </>
              ) : (
                // Si estamos en la página principal, usar Links normales
                <>
                  <Link href="#features" onClick={() => handleNavigation('features')}>
                    {t('nav.features')}
                  </Link>
                  <Link href="#how-it-works" onClick={() => handleNavigation('how-it-works')}>
                    {t('nav.howItWorks')}
                  </Link>
                  <Link href="#testimonials" onClick={() => handleNavigation('testimonials')}>
                    {t('nav.testimonials')}
                  </Link>
                  <Link href="#pricing" onClick={() => handleNavigation('pricing')}>
                    {t('nav.pricing')}
                  </Link>
                </>
              )}
              <ThemeToggle />
              <LanguageToggle />
              
              {/* User Menu o botones de login */}
              {user ? (
                <UserMenu 
                  user={user} 
                  isUserMenuOpen={isUserMenuOpen} 
                  setIsUserMenuOpen={setIsUserMenuOpen}
                />
              ) : (
                <>
                  <button
                    onClick={() => openLogin('signIn')}
                    className="flex items-center px-4 py-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white rounded-full font-medium transition-all duration-300"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    {t('login.signIn')}
                  </button>
                  <button
                    onClick={() => openLogin('signUp')}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300  hover:-translate-y-0.5"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t('login.signUp')}
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <ThemeToggle />
              <LanguageToggle />
              
              {/* User Menu o botones de login para móvil */}
              {user ? (
                <UserMenu 
                  user={user} 
                  isUserMenuOpen={isUserMenuOpen} 
                  setIsUserMenuOpen={setIsUserMenuOpen}
                  isMobile={true}
                />
              ) : (
                <>
                  <button
                    onClick={() => openLogin('signIn')}
                    className="text-amber-500"
                  >
                    <LogIn className="h-5 w-5" />
                  </button>
                  {/* <button
                    onClick={() => openLogin('signUp')}
                    className="text-amber-500"
                  >
                    <UserPlus className="h-5 w-5" />
                  </button> */}
                </>
              )}
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 dark:text-gray-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 bg-white dark:bg-dark-card rounded-lg shadow-lg dark:shadow-soft-dark">
              <div className="flex flex-col space-y-4 px-4">
                {isDocuCenter ? (
                  // Si estamos en DocuCenter, usar botones en lugar de Links
                  <>
                    <button 
                      className="text-left text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                      onClick={() => handleNavigation('features')}
                    >
                      {t('nav.features')}
                    </button>
                    <button 
                      className="text-left text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                      onClick={() => handleNavigation('how-it-works')}
                    >
                      {t('nav.howItWorks')}
                    </button>
                    <button 
                      className="text-left text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                      onClick={() => handleNavigation('testimonials')}
                    >
                      {t('nav.testimonials')}
                    </button>
                    <button 
                      className="text-left text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                      onClick={() => handleNavigation('pricing')}
                    >
                      {t('nav.pricing')}
                    </button>
                  </>
                ) : (
                  // Si estamos en la página principal, usar Links normales
                  <>
                    <Link href="#features" onClick={() => handleNavigation('features')}>
                      {t('nav.features')}
                    </Link>
                    <Link href="#how-it-works" onClick={() => handleNavigation('how-it-works')}>
                      {t('nav.howItWorks')}
                    </Link>
                    <Link href="#testimonials" onClick={() => handleNavigation('testimonials')}>
                      {t('nav.testimonials')}
                    </Link>
                    <Link href="#pricing" onClick={() => handleNavigation('pricing')}>
                      {t('nav.pricing')}
                    </Link>
                  </>
                )}
                {/* <a 
                  href="https://wa.me/14155238886?text=join%20numeral-excited"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium hover:shadow-lg transition-all text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.getStarted')}
                </a> */}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modal de Login */}
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} initialTab={activeTab} />
    </>
  );
};

export default Navbar;