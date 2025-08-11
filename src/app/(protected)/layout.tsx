'use client';

import React from 'react';
import { useAuthGuard } from '@/presentation/hooks/auth/use-auth-guard';
import { LoadingSpinner } from '@/presentation/components/common/loading-spinner';
import { Sidebar } from '@/presentation/components/layouts/sidebar';
import { Navbar } from '@/presentation/components/layouts/navbar';
import { useSidebar, useMobileMenu } from '@/presentation/stores/ui.store';

/**
 * Layout para páginas protegidas (dashboard, profile, etc.)
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { canAccess, isLoading } = useAuthGuard();
  const { sidebarCollapsed } = useSidebar();
  const { mobileMenuOpen } = useMobileMenu();

  // Mostrar loading mientras verifica autenticación
  if (isLoading) {
    return <LoadingSpinner fullScreen text="Verificando acceso..." />;
  }

  // Si no puede acceder, el guard se encarga de redirigir
  if (!canAccess) {
    return <LoadingSpinner fullScreen text="Redirigiendo..." />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Top navbar */}
        <Navbar />
        
        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => useMobileMenu().setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
