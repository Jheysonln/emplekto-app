/**
 * Utilidades para localStorage con manejo de errores
 */
export const storage = {
  /**
   * Obtiene un item del localStorage
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Error getting item from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Guarda un item en localStorage
   */
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Error setting item to localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Elimina un item del localStorage
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing item from localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Limpia todo el localStorage
   */
  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Error clearing localStorage', error);
      return false;
    }
  },

  /**
   * Obtiene y parsea un objeto JSON del localStorage
   */
  getObject: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Error parsing JSON from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Stringifica y guarda un objeto en localStorage
   */
  setObject: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error stringifying object to localStorage: ${key}`, error);
      return false;
    }
  },
};