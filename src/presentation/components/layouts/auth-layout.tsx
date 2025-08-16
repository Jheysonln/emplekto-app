import React from 'react';
import { APP_CONFIG } from '../../../shared/constants/app.constants';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * Layout para páginas de autenticación (login, register)
 */
export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {APP_CONFIG.NAME}
            </h1>
            {title && (
              <h2 className="mt-6 text-2xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
          
          {children}
        </div>
      </div>

      {/* Right side - Image/Brand */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">
                Bienvenido a {APP_CONFIG.NAME}
              </h2>
              <p className="text-xl opacity-90">
                {APP_CONFIG.DESCRIPTION}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
