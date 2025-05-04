import React from 'react';
import { Check } from 'lucide-react';

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Basic",
    price: "Free",
    description: "Essential features for starting your property search",
    features: [
      "Basic property matching",
      "Limited market insights",
      "Email support",
      "5 property recommendations per week",
      "Basic neighborhood data"
    ],
    buttonText: "Get Started"
  },
  {
    title: "Premium",
    price: "$29/mo",
    description: "Advanced features for serious property seekers",
    features: [
      "Advanced AI property matching",
      "Comprehensive market analysis",
      "Investment return projections",
      "Unlimited property recommendations",
      "Detailed neighborhood insights",
      "Priority support"
    ],
    buttonText: "Start Free Trial",
    popular: true
  },
  {
    title: "Enterprise",
    price: "$99/mo",
    description: "Complete solution for real estate professionals",
    features: [
      "All Premium features",
      "Portfolio analysis",
      "Client management tools",
      "Market prediction reports",
      "Real-time market alerts",
      "Dedicated account manager",
      "API access"
    ],
    buttonText: "Contact Sales"
  }
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Choose the plan that fits your real estate needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-gray-700">Secure Transactions</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-gray-700">Cancel Anytime</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-gray-700">24/7 Support</span>
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
  return (
    <div className={`relative bg-white rounded-xl overflow-hidden transition-all duration-300 ${
      plan.popular 
        ? 'shadow-xl border-2 border-amber-400 transform hover:-translate-y-2' 
        : 'shadow-md border border-gray-100 transform hover:-translate-y-1'
    }`}>
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-amber-400 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 translate-y-3">
            POPULAR
          </div>
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {plan.title}
        </h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          {plan.price !== "Free" && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        <p className="text-gray-600 mb-6 font-light">
          {plan.description}
        </p>
        <button className={`w-full py-3 rounded-lg font-medium mb-8 transition-all duration-300 ${
          plan.popular 
            ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white hover:shadow-lg' 
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}>
          {plan.buttonText}
        </button>
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className={`p-1 rounded-full mr-3 mt-0.5 ${plan.popular ? 'bg-amber-50' : 'bg-gray-50'}`}>
                <Check className={`h-4 w-4 ${plan.popular ? 'text-amber-500' : 'text-gray-500'}`} />
              </div>
              <span className="text-gray-700 font-light">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;