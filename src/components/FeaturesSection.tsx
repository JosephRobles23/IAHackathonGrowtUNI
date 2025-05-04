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

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful AI Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Our intelligent real estate assistant combines cutting-edge AI with deep market knowledge
            to transform your property search experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<TrendingUp className="h-6 w-6 text-amber-500" />}
            title="Market Prediction"
            description="Anticipate market changes with AI-powered trend analysis and forecasting."
          />
          <FeatureCard
            icon={<Building className="h-6 w-6 text-amber-500" />}
            title="Property Matching"
            description="Find properties that perfectly match your preferences, needs, and budget."
          />
          <FeatureCard
            icon={<PieChart className="h-6 w-6 text-amber-500" />}
            title="Investment Analysis"
            description="Evaluate potential returns and risks for any property investment opportunity."
          />
          <FeatureCard
            icon={<Compass className="h-6 w-6 text-amber-500" />}
            title="Neighborhood Insights"
            description="Get detailed information about amenities, safety, schools, and lifestyle fit."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-amber-500" />}
            title="Instant Valuation"
            description="Receive accurate property valuations based on current market conditions."
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-amber-500" />}
            title="Real-time Alerts"
            description="Stay informed with instant notifications for new properties matching your criteria."
          />
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Enhanced with Advanced AI
              </h3>
              <p className="text-gray-600 mb-6 font-light">
                Our proprietary machine learning algorithms analyze thousands of data points to provide you with the most accurate and personalized real estate guidance.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-amber-50 p-2 rounded-lg mr-3 mt-1">
                    <Shield className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Data Security</h4>
                    <p className="text-gray-600 font-light">Your data is always protected with enterprise-grade security.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-50 p-2 rounded-lg mr-3 mt-1">
                    <UserCheck className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Expert Verification</h4>
                    <p className="text-gray-600 font-light">All AI recommendations are verified by real estate professionals.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img
                src="https://images.pexels.com/photos/5836/yellow-metal-design-decoration.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 font-light">{description}</p>
    </div>
  );
};

export default FeaturesSection;