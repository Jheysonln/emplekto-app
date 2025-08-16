'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../stores/auth.store';
import { useApi } from '../hooks/use-api';

interface AuthContextType {
  // Context puede extenderse en el futuro si es necesario
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider para inicialización de autenticación
 * Maneja la carga inicial y validación de sesión
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, setLoading } = useAuthStore();
  const { handleUnauthorized } = useApi();
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Aquí podrías validar si hay una sesión activa
        // Por ahora, simplemente marcamos como inicializado
        
        // TODO: Si tienes refresh token en cookie, intentar renovar sesión
        // const refreshToken = cookies.get('refreshToken');
        // if (refreshToken) {
        //   await refreshSession();
        // }
        
      } catch (error) {
        console.error('Error initializing auth:', error);
        handleUnauthorized();
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setLoading, handleUnauthorized]);

  // Mostrar loading mientras se inicializa
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const contextValue: AuthContextType = {
    isInitialized,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
