import React, { useRef, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserData, signOut } from '../lib/supabase-client';

interface UserMenuProps {
  user: UserData;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  user, 
  isUserMenuOpen, 
  setIsUserMenuOpen,
  isMobile = false 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Efecto para cerrar el menú al hacer clic fuera de él
  /* seEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsUserMenuOpen]); */
  
  const handleLogout = async () => {
    try {
      console.log('Ejecutando handleLogout...');
      await signOut();
      console.log('SignOut completado, cerrando menú de usuario');
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  const handleDocuCenterClick = () => { //
    console.log('Ejecutando handleDocuCenterClick, usuario:', !!user);
    if (user) {
      console.log('Navegando a /docu-center');
      navigate('/docu-center');
      setIsUserMenuOpen(false);
    }
  };
  
  // Función para obtener las iniciales del usuario
  const getUserInitials = () => {
    if (!user || !user.user_metadata?.name) {
      return user?.email?.substring(0, 2).toUpperCase() || 'U';
    }
    
    const name = user.user_metadata.name;
    const nameParts = name.split(' ');
    
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    
    return name.substring(0, 2).toUpperCase();
  };

  const buttonSize = isMobile ? "w-8 h-8" : "w-10 h-10";

  return (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className={`${buttonSize} rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors`}
      >
        {getUserInitials()}
      </button>
      
      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-lg pt-2 z-50 border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.user_metadata?.name || user.email}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
          <button 
            onClick={handleDocuCenterClick}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover"
          >
            DocuCenter
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 rounded-b-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-red-700 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t('Sign Out')}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 