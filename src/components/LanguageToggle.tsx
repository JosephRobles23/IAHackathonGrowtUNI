import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageToggle: React.FC = () => {
  const { isEnglish, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
      aria-label="Toggle language"
    >
      <span className="font-medium text-gray-600 dark:text-gray-200">
        {isEnglish ? 'ES' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;