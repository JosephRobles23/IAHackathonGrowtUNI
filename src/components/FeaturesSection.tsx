import React from 'react';
import {
  TrendingUp,
  PieChart,
  Compass,
  Zap,
  Shield,
  UserCheck,
  Clock,
  Building
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="features" className="py-20 bg-white dark:bg-dark-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div data-aos="fade-up" data-aos-delay="100">
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6 text-amber-500" />}
              title={t('features.marketPrediction')}
              description={t('features.marketPredictionDesc')}
              inDevelopment={true}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <FeatureCard
              icon={<Building className="h-6 w-6 text-amber-500" />}
              title={t('features.propertyMatching')}
              description={t('features.propertyMatchingDesc')}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <FeatureCard
              icon={<PieChart className="h-6 w-6 text-amber-500" />}
              title={t('features.investmentAnalysis')}
              description={t('features.investmentAnalysisDesc')}
              inDevelopment={true}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <FeatureCard
              icon={<Compass className="h-6 w-6 text-amber-500" />}
              title={t('features.neighborhoodInsights')}
              description={t('features.neighborhoodInsightsDesc')}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-amber-500" />}
              title={t('features.instantValuation')}
              description={t('features.instantValuationDesc')}
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-amber-500" />}
              title={t('features.realTimeAlerts')}
              description={t('features.realTimeAlertsDesc')}
              inDevelopment={true}
            />
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-card dark:to-dark-hover rounded-2xl p-8 md:p-12" data-aos="fade-up" data-aos-delay="400">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right" data-aos-delay="500">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('features.enhancedAI')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-light">
                {t('features.enhancedAIDesc')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start" data-aos="fade-up" data-aos-delay="600">
                  <div className="bg-amber-50 dark:bg-dark-hover p-2 rounded-lg mr-3 mt-1">
                    <Shield className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('features.dataSecurity')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-light">{t('features.dataSecurityDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start" data-aos="fade-up" data-aos-delay="700">
                  <div className="bg-amber-50 dark:bg-dark-hover p-2 rounded-lg mr-3 mt-1">
                    <UserCheck className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('features.expertVerification')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-light">{t('features.expertVerificationDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12" data-aos="fade-left" data-aos-delay="500">
              <img
                src="https://i.postimg.cc/SR5hXZsn/Agente-mostrando-depa-futurista.jpg"
                alt="Advanced AI Real Estate"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  inDevelopment?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, inDevelopment }) => {
  return (
    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative">
      {inDevelopment && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white text-sm py-1 px-2 rounded-bl-lg rounded-tr-lg font-medium">
          En desarrollo
        </div>
      )}
      <div className="bg-amber-50 dark:bg-dark-hover p-3 rounded-lg inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 font-light">{description}</p>
    </div>
  );
};

export default FeaturesSection;