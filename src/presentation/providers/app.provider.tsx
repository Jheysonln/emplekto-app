'use client';

import React from 'react';
import { ReactQueryProvider } from './react-query.provider';
import { AuthProvider } from './auth.provider';
import { ToastProvider } from '../components/ui/toast';

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * Provider principal que combina todos los providers
 * Orden correcto: ReactQuery → Auth → Toast → Children
 */
export function AppProvider({ children }: AppProviderProps) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        {children}
        <ToastProvider />
      </AuthProvider>
    </ReactQueryProvider>
  );
}