import React from 'react';
import { Spinner } from '@/presentation/components/ui/spinner';
import { cn } from '@/shared/utils/cn.utils';

interface LoadingSpinnerProps {
  /**
   * Tamaño del spinner
   */
  size?: 'sm' | 'default' | 'lg' | 'xl';
  
  /**
   * Texto a mostrar debajo del spinner
   */
  text?: string;
  
  /**
   * Si debe ocupar toda la pantalla
   */
  fullScreen?: boolean;
  
  /**
   * Si debe ser mostrado
   */
  show?: boolean;
  
  /**
   * Clases adicionales
   */
  className?: string;
}

/**
 * Componente de spinner de carga reutilizable
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'default',
  text = 'Cargando...',
  fullScreen = false,
  show = true,
  className,
}) => {
  if (!show) return null;

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center gap-3',
      className
    )}>
      <Spinner size={size} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};