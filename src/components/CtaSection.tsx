import React from 'react';
import { ArrowRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Start Finding Your Perfect Property Today
              </h2>
              <p className="text-white/90 text-lg mb-8 font-light">
                Join thousands of satisfied clients who have found their dream properties with our AI-powered real estate advisor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-white text-amber-500 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="px-8 py-3 bg-transparent border border-white text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                  Schedule Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <img
                src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Luxury Property"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg max-w-xs">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to find your dream home?</h3>
                  <p className="text-gray-700 mb-4">Our AI can match you with properties that perfectly fit your lifestyle and budget.</p>
                  <div className="flex items-center text-amber-500">
                    <span className="font-medium">Learn more</span>
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