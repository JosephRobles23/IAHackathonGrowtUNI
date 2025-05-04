import React from 'react';
import { Home, ArrowRight, Building as BuildingSkyscraper, TrendingUp, Brain } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Find Your <span className="text-amber-500">Perfect Property</span> with AI Precision
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-light">
              Our advanced AI analyzes thousands of properties, market trends, and your preferences to find your ideal real estate match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-medium text-lg hover:shadow-md transition-all duration-300 flex items-center justify-center">
                See Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/7613553/pexels-photo-7613553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="AI Real Estate Advisor" 
                className="w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 flex items-center">
                <div className="bg-amber-50 p-2 rounded-lg mr-3">
                  <Home className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Property Matches</p>
                  <p className="text-lg font-bold text-gray-900">24 New Today</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 flex items-center">
                <div className="bg-amber-50 p-2 rounded-lg mr-3">
                  <TrendingUp className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Market Trend</p>
                  <p className="text-lg font-bold text-gray-900">+3.2% Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
              <Brain className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Property Matching</h3>
            <p className="text-gray-600 font-light">Our AI learns your preferences and finds properties that match your specific needs.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
              <TrendingUp className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Market Analysis</h3>
            <p className="text-gray-600 font-light">Get real-time insights on property values, trends, and investment opportunities.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
              <BuildingSkyscraper className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Recommendations</h3>
            <p className="text-gray-600 font-light">Receive tailored property suggestions based on your lifestyle and financial goals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;