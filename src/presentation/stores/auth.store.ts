import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthSession, User } from "@/core/entities";

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: AuthSession | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  clearError: () => void;
}

/**
 * Store para manejo de estado de autenticación
 * ✅ Tokens SOLO en memoria (NO localStorage)
 * ✅ Refresh token manejado por backend en HttpOnly cookies
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => {
        set({ user, isAuthenticated: !!user }, false, 'auth/setUser');
      },

      setSession: (session) => {
        if (session) {
          set({
            user: session.user,
            accessToken: session.tokens.accessToken,
            isAuthenticated: true,
            error: null,
          }, false, 'auth/setSession');
        } else {
          get().logout();
        }
      },

      setLoading: (isLoading) => {
        set({ isLoading }, false, 'auth/setLoading');
      },

      setError: (error) => {
        set({ error, isLoading: false }, false, 'auth/setError');
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }, false, 'auth/logout');
      },

      clearError: () => {
        set({ error: null }, false, 'auth/clearError');
      },
    }),
    { name: 'AuthStore' }
  )
);