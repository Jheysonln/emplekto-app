import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './use-auth';
import { ROUTES } from '@/shared/constants/routes.constants';

export interface UseAuthGuardOptions {
  /**
   * Redirigir a esta ruta si no está autenticado
   */
  redirectTo?: string;
  
  /**
   * Roles requeridos para acceder
   */
  requiredRoles?: string[];
  
  /**
   * Si es true, solo usuarios NO autenticados pueden acceder (ej: login)
   */
  guestOnly?: boolean;
  
  /**
   * Callback cuando falla la autorización
   */
  onUnauthorized?: () => void;
}

/**
 * Hook para proteger rutas con autenticación y roles
 */
export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const {
    redirectTo = ROUTES.LOGIN,
    requiredRoles = [],
    guestOnly = false,
    onUnauthorized,
  } = options;

  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // No hacer nada mientras carga
    if (isLoading) return;

    // Si es solo para invitados y está autenticado, redirigir al dashboard
    if (guestOnly && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
      return;
    }

    // Si requiere autenticación y no está autenticado
    if (!guestOnly && !isAuthenticated) {
      if (onUnauthorized) {
        onUnauthorized();
      } else {
        router.push(redirectTo);
      }
      return;
    }

    // Si requiere roles específicos
    if (requiredRoles.length > 0 && user) {
      const hasRequiredRole = requiredRoles.includes(user.roleName);
      
      if (!hasRequiredRole) {
        if (onUnauthorized) {
          onUnauthorized();
        } else {
          router.push(ROUTES.DASHBOARD); // Redirigir a dashboard si no tiene permisos
        }
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, guestOnly, requiredRoles, redirectTo, router, onUnauthorized]);

  return {
    isAuthenticated,
    user,
    isLoading,
    canAccess: guestOnly 
      ? !isAuthenticated 
      : isAuthenticated && (requiredRoles.length === 0 || (user && requiredRoles.includes(user.roleName))),
  };
};