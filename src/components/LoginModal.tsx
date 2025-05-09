import React, { useState } from 'react';
import { X, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase-client';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'signIn' | 'signUp';
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, initialTab = 'signIn' }) => {
  const [activeTab, setActiveTab] = useState<'signIn' | 'signUp'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError(t('login.passwordsDoNotMatch'));
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
      // No cerramos el modal aquí ya que Google nos redireccionará
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión con Google');
      setGoogleLoading(false);
    }
  };

  const switchTab = (tab: 'signIn' | 'signUp') => {
    setActiveTab(tab);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl p-5 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="flex items-center mb-4 sm:mb-6">
          <Building className="h-7 w-7 sm:h-8 sm:w-8 text-amber-500" />
          <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">DepaseoX</span>
        </div>

        {/* Tabs para cambiar entre Sign In y Sign Up */}
        {/* <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm flex-1 ${
              activeTab === 'signIn'
                ? 'text-amber-500 border-b-2 border-amber-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => switchTab('signIn')}
          >
            {t('login.signIn')}
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm flex-1 ${
              activeTab === 'signUp'
                ? 'text-amber-500 border-b-2 border-amber-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => switchTab('signUp')}
          >
            {t('login.signUp')}
          </button>
        </div> */}

        {/* <div className="flex items-center mb-6">
          <Building className="h-8 w-8 text-amber-500" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DepaseoX</span>
        </div> */}

        {activeTab === 'signIn' ? (
          // Formulario de Sign In
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              {t('login.welcomeBack')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              {t('login.subtitle')}
            </p>

            <form onSubmit={handleSignIn} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-dark-bg dark:text-white text-sm sm:text-base"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('login.password')}
                  </label>
                  <a href="#" className="text-xs sm:text-sm text-amber-500 hover:text-amber-600 font-medium">
                    {t('login.forgotPassword')}
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-dark-bg dark:text-white text-sm sm:text-base"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs sm:text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg font-medium hover:from-amber-700 hover:to-amber-500 text-sm sm:text-base"
              >
                {loading ? t('login.loggingIn') : t('login.signIn')}
              </button>
            </form>
          </>
        ) : (
          // Formulario de Sign Up
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              {t('login.createAccount')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              {t('login.createAccountSubtitle')}
            </p>

            <form onSubmit={handleSignUp} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.name')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-dark-bg dark:text-white text-sm sm:text-base"
                  placeholder={t('login.fullName')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-dark-bg dark:text-white text-sm sm:text-base"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-dark-bg dark:text-white text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('login.confirmPassword')}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-dark-bg dark:text-white text-sm sm:text-base"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs sm:text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg font-medium hover:from-amber-700 hover:to-amber-500 text-sm sm:text-base"
              >
                {loading ? t('login.signingUp') : t('login.signUp')}
              </button>
            </form>
          </>
        )}

        <div className="mt-4 sm:mt-6">
          <div className="relative mb-3 sm:mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white dark:bg-dark-card text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                {t('login.orContinueWith')}
              </span>
            </div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors disabled:opacity-50 text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px" className="sm:w-[24px] sm:h-[24px]">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {googleLoading ? 'Conectando...' : 'Continuar con Google'}
            </span>
          </button>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {activeTab === 'signIn' 
              ? `${t('login.noAccount')} `
              : `${t('login.alreadyHaveAccount')} `
            }
            <button 
              onClick={() => switchTab(activeTab === 'signIn' ? 'signUp' : 'signIn')}
              className="text-amber-500 hover:text-amber-600 font-medium"
            >
              {activeTab === 'signIn' ? t('login.signUp') : t('login.signIn')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 