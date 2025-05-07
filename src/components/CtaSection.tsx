import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CtaSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-white dark:bg-dark-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-3xl overflow-hidden" data-aos="zoom-in" data-aos-duration="1500">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 md:p-16" data-aos="fade-right" data-aos-delay="500">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {t('cta.title')}
              </h2>
              <p className="text-white/90 text-lg mb-8 font-light">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="600">
                <a 
                  href="https://wa.me/14155238886?text=join%20numeral-excited"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white dark:bg-dark-card text-amber-500 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                >
                  {t('cta.getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <button className="px-8 py-3 bg-transparent border border-white text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                  {t('cta.scheduleDemo')}
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative" data-aos="fade-left" data-aos-delay="400">
              <img
                src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Luxury Property"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm p-6 rounded-lg max-w-xs mx-4" data-aos="fade-up" data-aos-delay="1000">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('cta.readyToFind')}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{t('cta.aiMatch')}</p>
                  <div className="flex items-center text-amber-500">
                    <span className="font-medium">{t('cta.learnMore')}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;