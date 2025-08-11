import { useCallback } from 'react';
import { useToasts } from '@/presentation/stores/ui.store';
import { Toast } from '@/presentation/stores/ui.store';

/**
 * Hook simplificado para mostrar toasts
 */
export const useToast = () => {
  const { addToast, removeToast, clearToasts } = useToasts();

  const toast = useCallback((options: Omit<Toast, 'id' | 'timestamp'>) => {
    addToast(options);
  }, [addToast]);

  const success = useCallback((message: string, title?: string) => {
    toast({
      type: 'success',
      title,
      message,
    });
  }, [toast]);

  const error = useCallback((message: string, title?: string) => {
    toast({
      type: 'error',
      title: title || 'Error',
      message,
    });
  }, [toast]);

  const warning = useCallback((message: string, title?: string) => {
    toast({
      type: 'warning',
      title: title || 'Advertencia',
      message,
    });
  }, [toast]);

  const info = useCallback((message: string, title?: string) => {
    toast({
      type: 'info',
      title,
      message,
    });
  }, [toast]);

  return {
    toast,
    success,
    error,
    warning,
    info,
    remove: removeToast,
    clear: clearToasts,
  };
};