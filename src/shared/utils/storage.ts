// LocalStorage helpers
export const storage = {
  get: <T = string>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(item);
      } catch {
        return item as T;
      }
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  set: (key: string, value: any): void => {
    if (typeof window === 'undefined') return;
    
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// Cookie helpers básicos (solo para lectura, las escritura las maneja el backend)
export const cookies = {
  get: (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    
    return null;
  },

  // Helper para verificar si existe una cookie
  exists: (name: string): boolean => {
    return cookies.get(name) !== null;
  },
};