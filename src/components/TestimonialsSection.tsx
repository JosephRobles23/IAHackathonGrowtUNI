import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "First-time Homebuyer",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "The AI advisor found us a perfect starter home that met all our criteria and was within our budget. It even suggested neighborhoods we hadn't considered that ended up being perfect for us.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Real Estate Investor",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "As an investor, I need data-driven insights to make profitable decisions. This AI platform provides market analysis that helps me identify promising properties with strong ROI potential.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Relocating Professional",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "When I had to relocate for work, I was worried about finding a new home remotely. The AI advisor provided virtual tours and neighborhood insights that made my decision easy and confident.",
    rating: 4
  }
];

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-dark-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} data-aos="fade-up" data-aos-delay={200 * (index + 1)}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-dark-card dark:to-dark-hover rounded-2xl p-8 md:p-12" data-aos="fade-up" data-aos-delay="1000">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0" data-aos="fade-right" data-aos-delay="1200">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('testimonials.joinThousands')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {t('testimonials.joinThousandsDesc')}
              </p>
              <div className="flex space-x-4 flex-wrap">
                <div className="text-center" data-aos="fade-up" data-aos-delay="1400">
                  <p className="text-3xl font-bold text-amber-500">98%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.matchAccuracy')}</p>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="1600">
                  <p className="text-3xl font-bold text-amber-500">10k+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.happyClients')}</p>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="1800">
                  <p className="text-3xl font-bold text-amber-500">$2B+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.propertiesSold')}</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 md:pl-12 flex justify-center" data-aos="fade-left" data-aos-delay="2000">
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {t('testimonials.getStarted')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-14 w-14 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic font-light">"{testimonial.content}"</p>
    </div>
  );
};

export default TestimonialsSection;