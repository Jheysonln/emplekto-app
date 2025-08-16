import * as React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Toast provider component - configuración global
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '8px',
        },
        success: {
          style: {
            background: '#10B981',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
          },
        },
        error: {
          style: {
            background: '#EF4444',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
          },
        },
      }}
    />
  );
}
