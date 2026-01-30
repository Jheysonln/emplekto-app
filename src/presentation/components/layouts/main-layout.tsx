import React from 'react';
import { useUIStore } from '../../stores/ui.store';
import { useAuthStore } from '../../stores/auth.store';
import { useAuth } from '../../hooks/use-auth';
import { Button } from '../ui/button';
import { APP_CONFIG, ROUTES } from '../../../shared/constants/app.constants';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal con sidebar y navbar
 */
export function MainLayout({ children }: MainLayoutProps) {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
        <div className="flex flex-col h-full bg-white shadow-lg">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b">
            <h1 className={`font-bold text-xl text-gray-900 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              {APP_CONFIG.NAME}
            </h1>
            {sidebarCollapsed && (
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            <SidebarLink href={ROUTES.DASHBOARD} collapsed={sidebarCollapsed}>
              📊 Dashboard
            </SidebarLink>
            <SidebarLink href={ROUTES.USERS} collapsed={sidebarCollapsed}>
              👥 Usuarios
            </SidebarLink>
            <SidebarLink href={ROUTES.PROFILE} collapsed={sidebarCollapsed}>
              👤 Perfil
            </SidebarLink>
          </nav>

          {/* Collapse button */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="w-full"
            >
              {sidebarCollapsed ? '→' : '←'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`${sidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        {/* Top navbar */}
        <header className="bg-white shadow-sm border-b h-16">
          <div className="flex items-center justify-between h-full px-6">
            <div>
              {/* Breadcrumb o título de página aquí */}
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-sm text-gray-600">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {user.roleDisplayName}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logout()}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  collapsed: boolean;
}

function SidebarLink({ href, children, collapsed }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
    >
      {collapsed ? (
        <span className="text-lg">{children?.toString().split(' ')[0]}</span>
      ) : (
        children
      )}
    </Link>
  );
}