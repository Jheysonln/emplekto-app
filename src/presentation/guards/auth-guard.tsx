'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/auth.store';
import { ROUTES } from '../../shared/constants/app.constants';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallbackPath?: string;
}

/**
 * Componente guard para proteger rutas que requieren autenticación
 */
export function AuthGuard({ 
  children, 
  requiredRoles = [], 
  fallbackPath = ROUTES.LOGIN 
}: AuthGuardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Si no está autenticado, redirigir a login
    if (!isAuthenticated) {
      const currentPath = window.location.pathname;
      const redirectUrl = `${fallbackPath}?redirect=${encodeURIComponent(currentPath)}`;
      router.push(redirectUrl);
      return;
    }

    // Si está autenticado pero no tiene el rol requerido
    if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.roleName)) {
      router.push(ROUTES.DASHBOARD); // Redirigir a dashboard
      return;
    }
  }, [isAuthenticated, user, requiredRoles, fallbackPath, router]);

  // Mostrar loading mientras valida
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si no tiene permisos, mostrar mensaje
  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.roleName)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Acceso Denegado</h2>
          <p className="text-gray-600 mt-2">No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Hook para verificar permisos en componentes
export function useAuthGuard() {
  const { isAuthenticated, user } = useAuthStore();

  const hasRole = (roleName: string): boolean => {
    return isAuthenticated && user?.roleName === roleName;
  };

  const hasAnyRole = (roleNames: string[]): boolean => {
    return isAuthenticated && user ? roleNames.includes(user.roleName) : false;
  };

  const isAdmin = (): boolean => {
    return hasRole('Admin');
  };

  const isModerator = (): boolean => {
    return hasRole('Moderator');
  };

  const isAdminOrModerator = (): boolean => {
    return hasAnyRole(['Admin', 'Moderator']);
  };

  return {
    isAuthenticated,
    user,
    hasRole,
    hasAnyRole,
    isAdmin,
    isModerator,
    isAdminOrModerator,
  };
}