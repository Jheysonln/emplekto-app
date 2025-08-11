import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthResponse } from '@/shared/types/auth.types';
import { storage } from '@/shared/utils/storage.utils';
import { AUTH_CONFIG } from '@/shared/constants/auth.constants';

export interface AuthState {
  // Estado
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Acciones
  setAuth: (authResponse: AuthResponse) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

/**
 * Store de autenticación con persistencia en localStorage
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Establecer autenticación completa
      setAuth: (authResponse: AuthResponse) => {
        set({
          user: authResponse.user,
          accessToken: authResponse.accessToken,
          isAuthenticated: true,
          error: null,
          isLoading: false,
        });

        // Guardar token en localStorage separadamente para el HTTP client
        storage.setItem(AUTH_CONFIG.TOKEN_STORAGE_KEY, authResponse.accessToken);
      },

      // Actualizar usuario
      setUser: (user: User) => {
        set({ user, error: null });
      },

      // Establecer estado de carga
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      // Establecer error
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      // Limpiar autenticación (sin afectar persistencia)
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });

        // Limpiar token del localStorage
        storage.removeItem(AUTH_CONFIG.TOKEN_STORAGE_KEY);
      },

      // Logout completo (limpia persistencia)
      logout: () => {
        const { clearAuth } = get();
        clearAuth();
        
        // Limpiar todos los datos relacionados
        storage.removeItem(AUTH_CONFIG.USER_STORAGE_KEY);
        storage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_STORAGE_KEY);

        // Disparar evento para otros componentes
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-logout'));
        }
      },

      // Actualizar datos del usuario
      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...updates };
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      
      // Solo persistir datos específicos (no tokens por seguridad)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),

      // Hidratar estado al cargar
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Recuperar token del localStorage si existe
          const token = storage.getItem(AUTH_CONFIG.TOKEN_STORAGE_KEY);
          if (token && state.isAuthenticated) {
            state.accessToken = token;
          } else {
            // Si no hay token, limpiar autenticación
            state.isAuthenticated = false;
            state.user = null;
          }
        }
      },
    }
  )
);

// Selectores para uso común
export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useAuthStore();
  return { user, isAuthenticated, isLoading, error };
};

export const useAuthActions = () => {
  const { setAuth, setUser, setLoading, setError, clearAuth, logout, updateUser } = useAuthStore();
  return { setAuth, setUser, setLoading, setError, clearAuth, logout, updateUser };
};