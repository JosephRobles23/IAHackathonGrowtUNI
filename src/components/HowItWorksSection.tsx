import React from 'react';
import { Search, BarChart3, UserCheck, Check } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Our AI Advisor Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            A seamless experience powered by sophisticated algorithms and real estate expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md relative">
            <div className="bg-amber-500 text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center absolute -top-6 left-8">
              1
            </div>
            <div className="pt-6">
              <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
                <Search className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Share Your Preferences</h3>
              <p className="text-gray-600 font-light mb-4">
                Tell us what you're looking for in a property. Location, budget, size, amenities - the more details, the better.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Detailed questionnaire</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Natural language processing</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Preference learning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md relative">
            <div className="bg-amber-500 text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center absolute -top-6 left-8">
              2
            </div>
            <div className="pt-6">
              <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
                <BarChart3 className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600 font-light mb-4">
                Our AI processes thousands of properties and market data points to identify the best matches for you.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Market trend analysis</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Property value assessment</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Neighborhood matching</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md relative">
            <div className="bg-amber-500 text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center absolute -top-6 left-8">
              3
            </div>
            <div className="pt-6">
              <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
                <UserCheck className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Recommendations</h3>
              <p className="text-gray-600 font-light mb-4">
                Receive a curated list of properties tailored to your preferences, with insights to help you make informed decisions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Customized property reports</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Investment potential metrics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-gray-600 font-light">Comparative market analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 bg-white rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/5816294/pexels-photo-5816294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="AI Property Analysis"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6">
                    <div className="bg-white/90 p-4 rounded-lg backdrop-blur-sm">
                      <h4 className="text-gray-900 font-bold mb-2">Property Analysis</h4>
                      <p className="text-gray-700 text-sm">
                        AI-powered insights reveal hidden value in properties
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Continuous Learning & Improvement
              </h3>
              <p className="text-gray-600 mb-6 font-light">
                Our AI advisor becomes more intelligent with every interaction. It learns from your feedback and adapts its recommendations to better match your preferences.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-amber-50 p-2 rounded-lg mr-3 mt-1">
                    <Check className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-light">Feedback-driven improvement system ensures increasingly accurate matches</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-50 p-2 rounded-lg mr-3 mt-1">
                    <Check className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-light">Market data updates in real-time for current property valuations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-amber-50 p-2 rounded-lg mr-3 mt-1">
                    <Check className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-light">Expert real estate professionals review AI recommendations</p>
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