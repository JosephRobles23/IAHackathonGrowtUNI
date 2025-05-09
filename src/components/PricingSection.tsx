import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PricingPlan {
  titleKey: string;
  priceKey: string;
  descriptionKey: string;
  featuresKeys: string[];
  buttonTextKey: string;
  popular?: boolean;
}

const PricingSection: React.FC = () => {
  const { t } = useTranslation();
  
  const pricingPlans: PricingPlan[] = [
    {
      titleKey: "pricing.basic",
      priceKey: "pricing.free",
      descriptionKey: "pricing.basicDesc",
      featuresKeys: [
        "pricing.basicFeature1",
        "pricing.basicFeature2",
        "pricing.basicFeature3",
        "pricing.basicFeature4",
        "pricing.basicFeature5"
      ],
      buttonTextKey: "pricing.getStarted"
    },
    {
      titleKey: "pricing.premium",
      priceKey: "pricing.premiumPrice",
      descriptionKey: "pricing.premiumDesc",
      featuresKeys: [
        "pricing.premiumFeature1",
        "pricing.premiumFeature2",
        "pricing.premiumFeature3",
        "pricing.premiumFeature4",
        "pricing.premiumFeature5",
        "pricing.premiumFeature6"
      ],
      buttonTextKey: "pricing.startTrial",
      popular: true
    },
    {
      titleKey: "pricing.enterprise",
      priceKey: "pricing.enterprisePrice",
      descriptionKey: "pricing.enterpriseDesc",
      featuresKeys: [
        "pricing.enterpriseFeature1",
        "pricing.enterpriseFeature2",
        "pricing.enterpriseFeature3",
        "pricing.enterpriseFeature4",
        "pricing.enterpriseFeature5",
        "pricing.enterpriseFeature6",
        "pricing.enterpriseFeature7"
      ],
      buttonTextKey: "pricing.contactSales"
    }
  ];

  return (
    <section id="pricing" className="py-12 sm:py-20 bg-gray-50 dark:bg-dark-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">{t('pricing.trialInfo')}</p>
          <div className="flex justify-center flex-wrap gap-3 sm:gap-4">
            <div className="flex items-center" data-aos="fade-up" data-aos-delay="500">
              <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-amber-500 mr-1.5 sm:mr-2"></div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{t('pricing.secureTransactions')}</span>
            </div>
            <div className="flex items-center" data-aos="fade-up" data-aos-delay="600">
              <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-amber-500 mr-1.5 sm:mr-2"></div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{t('pricing.cancelAnytime')}</span>
            </div>
            <div className="flex items-center" data-aos="fade-up" data-aos-delay="700">
              <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-amber-500 mr-1.5 sm:mr-2"></div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{t('pricing.support')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const { t } = useTranslation();
  
  return (
    <div className={`relative bg-white dark:bg-dark-card rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 h-full ${
      plan.popular 
        ? 'shadow-xl border-2 border-amber-400 transform hover:-translate-y-2' 
        : 'shadow-md border border-gray-100 dark:border-dark-border transform hover:-translate-y-1'
    }`}>
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 transform rotate-45 translate-x-5 sm:translate-x-6 translate-y-2 sm:translate-y-3">
            {t('pricing.popular')}
          </div>
        </div>
      )}
      <div className="p-5 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          {t(plan.titleKey)}
        </h3>
        <div className="mb-3 sm:mb-4">
          <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{t(plan.priceKey)}</span>
          {plan.priceKey !== "pricing.free" && <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 ml-1">{t('pricing.month')}</span>}
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 font-light">
          {t(plan.descriptionKey)}
        </p>
        <a
          href="https://wa.me/14155238886?text=join%20numeral-excited"
          target="_blank" 
          rel="noopener noreferrer"
          className={`block w-full py-2.5 sm:py-3 rounded-lg font-medium mb-6 sm:mb-8 transition-all duration-300 text-center text-sm sm:text-base ${
            plan.popular 
              ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white hover:shadow-lg' 
              : 'bg-white dark:bg-dark-hover border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-hover'
          }`}
        >
          {t(plan.buttonTextKey)}
        </a>
        <div className="space-y-2 sm:space-y-3">
          {plan.featuresKeys.map((featureKey, index) => (
            <div key={index} className="flex items-start">
              <div className={`p-0.5 sm:p-1 rounded-full mr-2 sm:mr-3 mt-0.5 ${plan.popular ? 'bg-amber-50 dark:bg-dark-hover' : 'bg-gray-50 dark:bg-dark-hover'}`}>
                <Check className={`h-3 w-3 sm:h-4 sm:w-4 ${plan.popular ? 'text-amber-500' : 'text-gray-500 dark:text-gray-400'}`} />
              </div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-light">{t(featureKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;