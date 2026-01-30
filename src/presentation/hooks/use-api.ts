import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../stores/auth.store';
import { getErrorMessage } from '../../shared/utils/api.utils';

/**
 * Hook para configuración global de React Query
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: any) => {
          // No retry en errores 4xx
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          return failureCount < 2;
        },
        staleTime: 5 * 60 * 1000, // 5 minutos
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: (error) => {
          const message = getErrorMessage(error);
          toast.error(message);
        },
      },
    },
  });
};

/**
 * Hook para operaciones comunes de React Query
 */
export const useApi = () => {
  const { logout } = useAuthStore();

  const handleUnauthorized = () => {
    toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    logout();
  };

  const handleError = (error: unknown) => {
    const message = getErrorMessage(error);
    toast.error(message);
  };

  const handleSuccess = (message?: string) => {
    if (message) {
      toast.success(message);
    }
  };

  return {
    handleUnauthorized,
    handleError,
    handleSuccess,
  };
};