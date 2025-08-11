import { useEffect } from 'react';
import { useTheme as useThemeStore } from '@/presentation/stores/ui.store';

/**
 * Hook para manejo de tema dark/light
 */
export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();

  // Aplicar tema inicial al montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Obtener preferencia guardada o usar 'system'
      const savedTheme = localStorage.getItem('theme-preference') as 'light' | 'dark' | 'system' || 'system';
      
      if (savedTheme !== theme) {
        setTheme(savedTheme);
      }

      // Escuchar cambios en preferencias del sistema
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        if (theme === 'system') {
          const root = document.documentElement;
          if (mediaQuery.matches) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      };

      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      // Aplicar tema inicial
      handleSystemThemeChange();

      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, [theme, setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setSystemTheme = () => setTheme('system');

  return {
    theme,
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    isDark: theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight: theme === 'light' || (theme === 'system' && typeof window !== 'undefined' && !window.matchMedia('(prefers-color-scheme: dark)').matches),
    isSystem: theme === 'system',
  };
};
