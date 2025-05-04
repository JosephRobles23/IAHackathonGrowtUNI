import React, { useState, useEffect } from 'react';
import { Building, Menu, X } from 'lucide-react';
import { Link } from './ui/Link';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-dark-bg shadow-md dark:shadow-soft-dark py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-amber-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ProphetEstate</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features">{t('nav.features')}</Link>
            <Link href="#how-it-works">{t('nav.howItWorks')}</Link>
            <Link href="#testimonials">{t('nav.testimonials')}</Link>
            <Link href="#pricing">{t('nav.pricing')}</Link>
            <ThemeToggle />
            <LanguageToggle />
            <button className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              {t('nav.getStarted')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white dark:bg-dark-card rounded-lg shadow-lg dark:shadow-soft-dark">
            <div className="flex flex-col space-y-4 px-4">
              <Link href="#features" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.features')}
              </Link>
              <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.howItWorks')}
              </Link>
              <Link href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.testimonials')}
              </Link>
              <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>
                {t('nav.pricing')}
              </Link>
              <button className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium hover:shadow-lg transition-all">
                {t('nav.getStarted')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;