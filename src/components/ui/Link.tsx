import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ href, children, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
    
    if (onClick) onClick();
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 font-medium transition-colors"
    >
      {children}
    </a>
  );
};