import React from 'react';
import { Building, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Building className="h-8 w-8 text-amber-400" />
              <span className="ml-2 text-xl font-bold text-white">ProphetEstate</span>
            </div>
            <p className="text-gray-400 mb-6 font-light">
              Leveraging advanced AI to transform how you find, analyze, and invest in real estate.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#testimonials">Testimonials</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-3">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
              <FooterLink href="#">GDPR Compliance</FooterLink>
              <FooterLink href="#">Security</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-400 mr-3 mt-0.5" />
                <span className="text-gray-400 font-light">123 Innovation Drive, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-400 mr-3" />
                <span className="text-gray-400 font-light">contact@prophetestate.ai</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-400 mr-3" />
                <span className="text-gray-400 font-light">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ProphetEstate AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-gray-400 hover:text-amber-400 transition-colors font-light"
      >
        {children}
      </a>
    </li>
  );
};

interface SocialIconProps {
  Icon: React.ElementType;
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon }) => {
  return (
    <a 
      href="#" 
      className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
};

export default Footer;