'use client';

import { useEffect } from 'react';
import { Button } from '../presentation/components/ui/button';

/**
 * Error boundary global
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          ¡Ups! Algo salió mal
        </h2>
        <p className="text-gray-600 mb-8">
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </p>
        <div className="space-x-4">
          <Button onClick={reset}>
            Intentar Nuevamente
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
          >
            Ir al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}