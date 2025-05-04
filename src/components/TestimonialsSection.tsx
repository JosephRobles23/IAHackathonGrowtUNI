import React from 'react';
import { Star } from 'lucide-react';

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
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Hear from people who found their perfect properties with our AI real estate advisor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Join thousands of satisfied homebuyers and investors
              </h3>
              <p className="text-gray-700 mb-6">
                Our AI advisor has helped over 10,000 people find their ideal properties, with a 96% satisfaction rate.
              </p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-500">98%</p>
                  <p className="text-sm text-gray-600">Match Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-500">10k+</p>
                  <p className="text-sm text-gray-600">Happy Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-500">$2B+</p>
                  <p className="text-sm text-gray-600">Properties Sold</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 md:pl-12 flex justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                Get Started Today
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
    <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-14 w-14 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
          <p className="text-gray-600 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 italic font-light">"{testimonial.content}"</p>
    </div>
  );
};

export default TestimonialsSection;