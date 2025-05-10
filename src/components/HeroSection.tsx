import React, { useState, useEffect, useRef } from 'react';
import { Home, ArrowRight, Building as BuildingSkyscraper, TrendingUp, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import VideoModal from './ui/VideoModal';

// Interfaces y tipos
interface FeatureCard {
  id: number;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Generar lista de tarjetas de características
  const featureCards: FeatureCard[] = [
    {
      id: 1,
      icon: <Brain className="h-6 w-6 text-amber-500" />,
      titleKey: 'features.propertyMatching',
      descriptionKey: 'features.propertyMatchingDesc',
    },
    {
      id: 2,
      icon: <TrendingUp className="h-6 w-6 text-amber-500" />,
      titleKey: 'features.marketPrediction',
      descriptionKey: 'features.marketPredictionDesc',
    },
    {
      id: 3,
      icon: <BuildingSkyscraper className="h-6 w-6 text-amber-500" />,
      titleKey: 'features.investmentAnalysis',
      descriptionKey: 'features.investmentAnalysisDesc',
    },
  ];
  
  // Duplicar las tarjetas para crear un efecto de scroll infinito
  const duplicatedFeatureCards = [...featureCards, ...featureCards];
  
  // Calcular cuántas tarjetas mostrar según el ancho de la pantalla
  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
      return 1.2; // sm - mostrar 1.2 tarjetas en móvil para ver que hay más contenido
    }
    return 2; // default para SSR
  };
  
  const [visibleItems, setVisibleItems] = useState(getVisibleItems());
  
  // Actualizar visibleItems en cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
      setIsMobile(window.innerWidth < 768);
    };
    
    // Establecer el estado inicial de isMobile
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animar el desplazamiento automático
  useEffect(() => {
    if (isPaused) return;
    
    const cardWidth = 50 / visibleItems; // Ancho de cada tarjeta en porcentaje
    const totalWidth = cardWidth * featureCards.length; // Ancho total del carrusel original
    
    let animationFrameId: number;
    let isResetting = false;
    
    // Velocidad de desplazamiento más lenta en móviles
    const getScrollSpeed = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return 0.02; // Más lento en móviles
      }
      return 0.03; // Velocidad normal en desktop
    };
    
    const animate = () => {
      setScrollPosition(prevPos => {
        // Si hemos desplazado más allá del ancho total, preparar para reiniciar suavemente
        if (prevPos >= totalWidth) {
          if (!isResetting) {
            isResetting = true;
            // Usar setTimeout para dar tiempo a que se complete la transición actual
            setTimeout(() => {
              setScrollPosition(0);
              isResetting = false;
            }, 0);
          }
          // Mantener la posición actual durante el reseteo para evitar saltos
          return prevPos;
        }
        return prevPos + getScrollSpeed(); // Incremento adaptativo
      });
      
      if (!isResetting) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, visibleItems]);
  
  // Estilo para el contenedor que se desplaza - diferentes configuraciones para móvil y desktop
  const scrollerStyle = {
    transform: `translateX(-${scrollPosition}%)`,
    width: isMobile 
      ? `${duplicatedFeatureCards.length * 100}%` // Estilo móvil - más amplio para dar espacio a cada tarjeta
      : `${(duplicatedFeatureCards.length / visibleItems) * 80}%`,
  };
  
  // Función para calcular el ancho de cada elemento del carrusel según el dispositivo
  const getItemWidth = () => {
    if (isMobile) {
      return { width: '10%' }; // En móvil, cada tarjeta ocupa el 80% del contenedor visible
    } else {
      return { width: `${60 / visibleItems}%` }; // En desktop, se ajusta según visibleItems
    }
  };
  
  // Función para renderizar el título con las palabras específicas en color dorado
  const renderHighlightedTitle = () => {
    const isEnglish = i18n.language === 'en';
    
    if (isEnglish) {
      return (
        <>
          Find Your <span className="text-amber-500">Perfect Property</span> with AI Precision
        </>
      );
    } else {
      return (
        <>
          Encuentra tu <span className="text-amber-500">Propiedad Perfecta</span> con Precisión AI
        </>
      );
    }
  };
  
  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };
  
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };
  
  return (
    <section className="pt-28 pb-10 bg-gradient-to-b from-white to-gray-50 dark:from-dark-bg dark:to-dark-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right" data-aos-delay="100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              {renderHighlightedTitle()}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 font-light">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-4">
              <a 
                href="https://wa.me/51940125385?text=Hola,%20quiero%20saber%20más%20sobre%20DepaseoX"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-12 max-w-xs sm:px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
              >
                {t('hero.getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <button 
                onClick={openVideoModal}
                className="px-12 max-w-xs sm:px-8 py-3 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-200 rounded-full font-medium text-lg dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                {t('hero.seeDemo')}
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative" data-aos="fade-left" data-aos-delay="400">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://i.postimg.cc/tT5tkwQM/depa11.jpg" 
                alt="AI Real Estate Advisor" 
                className="w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-card rounded-xl shadow-lg p-4 flex items-center" data-aos="fade-up" data-aos-delay="400">
                <div className="bg-amber-50 dark:bg-dark-hover p-2 rounded-lg mr-3">
                  <Home className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('hero.propertyMatches')}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{t('hero.newToday')}</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white dark:bg-dark-card rounded-xl shadow-lg p-4 flex items-center" data-aos="fade-up" data-aos-delay="500">
                <div className="bg-amber-50 dark:bg-dark-hover p-2 rounded-lg mr-3">
                  <TrendingUp className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('hero.marketTrend')}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{t('hero.growth')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('features.title')}</h3>
          
          {/* Wrapper para el carrusel con padding específico para móvil */}
          <div className="px-2 sm:px-0">
            <div 
              className="overflow-hidden relative mx-auto max-w-[97%] sm:max-w-full rounded-lg"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
              ref={carouselRef}
            >
              {/* Efecto de desvanecimiento en el borde izquierdo */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-gray-50 dark:from-dark-bg to-transparent z-10"></div>
              
              <div 
                className="flex transition-transform duration-200 ease-linear py-4 md:py-6" 
                style={scrollerStyle}
              >
                {duplicatedFeatureCards.map((card, index) => (
                  <div 
                    key={`${card.id}-${index}`} 
                    className="flex-shrink-0 px-2 sm:px-3 md:px-4"
                    style={getItemWidth()}
                  >
                    <div className="bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 h-full mx-auto">
                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="bg-amber-50 dark:bg-dark-hover p-2 sm:p-3 rounded-lg inline-block mb-3 sm:mb-4">
                          {card.icon}
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">{t(card.titleKey)}</h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light line-clamp-5">{t(card.descriptionKey)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Efecto de desvanecimiento en el borde derecho */}
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-gray-50 dark:from-dark-bg to-transparent z-10"></div>
            </div>
          </div>
          
          {/* Indicador sutil para dispositivos móviles de que se puede deslizar */}
          {/* <div className="mt-4 text-center block sm:hidden">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <span className="w-8 h-0.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-1"></span>
              {t('common.swipeForMore')}
              <span className="w-8 h-0.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-1"></span>
            </span>
          </div> */}
        </div>
      </div>
      
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={closeVideoModal} 
        videoUrl="https://www.youtube.com/embed/FuM5nAUWyXs" 
      />
    </section>
  );
};

export default HeroSection;