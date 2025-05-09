import React, { useState } from 'react';
import { Home, ArrowRight, Building as BuildingSkyscraper, TrendingUp, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import VideoModal from './ui/VideoModal';

const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
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
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50 dark:from-dark-bg dark:to-dark-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right" data-aos-delay="100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              {renderHighlightedTitle()}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 font-light">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-row items-center sm:flex-row  gap-4">
              <a 
                href="https://wa.me/15556457930?text=Hola"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
              >
                {t('hero.getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <button 
                onClick={openVideoModal}
                className="px-12 md:px-8 py-3 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-200 rounded-full font-medium text-lg dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 flex items-center justify-center"
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
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-amber-50 dark:bg-dark-hover p-3 rounded-lg inline-block mb-4">
              <Brain className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('features.propertyMatching')}</h3>
            <p className="text-gray-600 dark:text-gray-300 font-light">{t('features.propertyMatchingDesc')}</p>
          </div>
          <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-amber-50 dark:bg-dark-hover p-3 rounded-lg inline-block mb-4">
              <TrendingUp className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('features.marketPrediction')}</h3>
            <p className="text-gray-600 dark:text-gray-300 font-light">{t('features.marketPredictionDesc')}</p>
          </div>
          <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-amber-50 dark:bg-dark-hover p-3 rounded-lg inline-block mb-4">
              <BuildingSkyscraper className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('features.investmentAnalysis')}</h3>
            <p className="text-gray-600 dark:text-gray-300 font-light">{t('features.investmentAnalysisDesc')}</p>
          </div>
        </div>
      </div>
      
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={closeVideoModal} 
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
      />
    </section>
  );
};

export default HeroSection;