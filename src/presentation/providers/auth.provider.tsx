'use client';

import React from 'react';

interface AuthContextType {
  isInitialized: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  isInitialized: true
});

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider simplificado para desarrollo
 * ✅ NO más loops infinitos
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // ✅ Directamente retornar children - sin complicaciones
  return <>{children}</>;
}

export function useAuthContext() {
  return React.useContext(AuthContext);
}