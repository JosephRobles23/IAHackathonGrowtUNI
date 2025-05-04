import React from 'react';
import { Search, BarChart3, UserCheck, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-dark-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-md relative" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-amber-500 text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center absolute -top-6 left-8">
              1
            </div>
            <div className="pt-6">
              <div className="bg-amber-50 dark:bg-dark-hover p-3 rounded-lg inline-block mb-4">
                <Search className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('howItWorks.step1')}</h3>
              <p className="text-gray-600 dark:text-gray-300 font-light mb-4">
                {t('howItWorks.step1Desc')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.detailedQuestionnaire')}</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.naturalLanguage')}</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.preferenceLearning')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-md relative" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-amber-500 text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center absolute -top-6 left-8">
              2
            </div>
            <div className="pt-6">
              <div className="bg-amber-50 dark:bg-dark-hover p-3 rounded-lg inline-block mb-4">
                <BarChart3 className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('howItWorks.step2')}</h3>
              <p className="text-gray-600 dark:text-gray-300 font-light mb-4">
                {t('howItWorks.step2Desc')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.marketTrendAnalysis')}</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.propertyValueAssessment')}</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.neighborhoodMatching')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-md relative" data-aos="fade-up" data-aos-delay="300">
            <div className="bg-amber-500 text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center absolute -top-6 left-8">
              3
            </div>
            <div className="pt-6">
              <div className="bg-amber-50 dark:bg-dark-hover p-3 rounded-lg inline-block mb-4">
                <UserCheck className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('howItWorks.step3')}</h3>
              <p className="text-gray-600 dark:text-gray-300 font-light mb-4">
                {t('howItWorks.step3Desc')}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.customizedReports')}</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.investmentMetrics')}</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.comparativeAnalysis')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 bg-white dark:bg-dark-card rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="400">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0" data-aos="fade-right" data-aos-delay="500">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://i.postimg.cc/j2GjVqy3/Gemini-Generated-Image-o3ce92o3ce92o3ce.jpg"
                  alt="AI Property Analysis"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6">
                    <div className="bg-white/90 dark:bg-dark-card/90 p-4 rounded-lg backdrop-blur-sm" data-aos="fade-up" data-aos-delay="600">
                      <h4 className="text-gray-900 dark:text-white font-bold mb-2">{t('howItWorks.propertyAnalysis')}</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {t('howItWorks.aiInsights')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12" data-aos="fade-left" data-aos-delay="500">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('howItWorks.continuousLearning')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-light">
                {t('howItWorks.continuousLearningDesc')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start" data-aos="fade-up" data-aos-delay="600">
                  <div className="bg-amber-50 dark:bg-dark-hover p-2 rounded-lg mr-3 mt-1">
                    <Check className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.feedbackSystem')}</p>
                  </div>
                </div>
                <div className="flex items-start" data-aos="fade-up" data-aos-delay="700">
                  <div className="bg-amber-50 dark:bg-dark-hover p-2 rounded-lg mr-3 mt-1">
                    <Check className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.realTimeUpdates')}</p>
                  </div>
                </div>
                <div className="flex items-start" data-aos="fade-up" data-aos-delay="800">
                  <div className="bg-amber-50 dark:bg-dark-hover p-2 rounded-lg mr-3 mt-1">
                    <Check className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 font-light">{t('howItWorks.expertReview')}</p>
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

export default HowItWorksSection;