'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useToasts } from '@/presentation/stores/ui.store';
import { Toast, ToastTitle, ToastDescription } from '@/presentation/components/ui/toast';
import { Button } from '@/presentation/components/ui/button';
import { cn } from '@/shared/utils/cn.utils';
import { Toast as ToastType } from '@/presentation/stores/ui.store';

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastVariants = {
  success: 'success',
  error: 'destructive',
  warning: 'warning',
  info: 'info',
} as const;

/**
 * Componente individual de Toast
 */
const ToastItem: React.FC<{ 
  toast: ToastType; 
  onRemove: (id: string) => void;
}> = ({ toast, onRemove }) => {
  const Icon = toastIcons[toast.type];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  return (
    <Toast 
      variant={toastVariants[toast.type] as any}
      className={cn(
        'animate-in slide-in-from-right-full',
        'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full'
      )}
      onClose={() => onRemove(toast.id)}
    >
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          {toast.title && (
            <ToastTitle>{toast.title}</ToastTitle>
          )}
          <ToastDescription>{toast.message}</ToastDescription>
        </div>
      </div>
    </Toast>
  );
};

/**
 * Proveedor de Toasts que renderiza las notificaciones
 */
export const ToastProvider: React.FC = () => {
  const { toasts, removeToast } = useToasts();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof window === 'undefined') {
    return null;
  }

  if (toasts.length === 0) {
    return null;
  }

  return createPortal(
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onRemove={removeToast}
        />
      ))}
    </div>,
    document.body
  );
};