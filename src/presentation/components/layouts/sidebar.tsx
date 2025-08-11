'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Briefcase, 
  Building2, 
  Users, 
  Settings, 
  ChevronLeft,
  User,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { cn } from '@/shared/utils/cn.utils';
import { useSidebar, useMobileMenu } from '@/presentation/stores/ui.store';
import { useAuth } from '@/presentation/hooks/auth/use-auth';
import { ROUTES } from '@/shared/constants/routes.constants';
import { UserRole } from '@/shared/types/auth.types';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: string[]; // Roles que pueden ver este item
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: Home,
  },
  {
    title: 'Mi Perfil',
    href: ROUTES.PROFILE,
    icon: User,
  },
  {
    title: 'Empleos',
    href: ROUTES.JOBS,
    icon: Briefcase,
  },
  {
    title: 'Empresas',
    href: ROUTES.COMPANIES,
    icon: Building2,
  },
  {
    title: 'Usuarios',
    href: ROUTES.USERS,
    icon: Users,
    roles: ['Admin', 'Moderator'],
  },
  {
    title: 'Análisis',
    href: '/analytics',
    icon: BarChart3,
    roles: ['Admin', 'Moderator', 'Employer'],
  },
  {
    title: 'Configuración',
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
];

/**
 * Sidebar de navegación
 */
export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useSidebar();
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu();
  const { user } = useAuth();

  // Filtrar items según el rol del usuario
  const filteredNavigation = navigation.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.roleName);
  });

  const handleLinkClick = () => {
    // Cerrar menú móvil al hacer click en un link
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const sidebarClasses = cn(
    'fixed top-0 left-0 z-50 h-full bg-card border-r transition-all duration-300',
    'flex flex-col',
    // Desktop
    sidebarCollapsed ? 'lg:w-16' : 'lg:w-64',
    // Mobile
    mobileMenuOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'
  );

  return (
    <aside className={sidebarClasses}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!sidebarCollapsed && (
          <Link 
            href={ROUTES.DASHBOARD} 
            className="flex items-center font-bold text-lg text-primary"
            onClick={handleLinkClick}
          >
            JobPlatform
          </Link>
        )}
        
        {/* Collapse button - solo desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex h-8 w-8"
          onClick={toggleSidebar}
        >
          <ChevronLeft className={cn(
            'h-4 w-4 transition-transform',
            sidebarCollapsed && 'rotate-180'
          )} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
                    sidebarCollapsed && 'lg:justify-center'
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {(!sidebarCollapsed || mobileMenuOpen) && (
                    <span className="truncate">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info */}
      {(!sidebarCollapsed || mobileMenuOpen) && user && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.role === UserRole.JobSeeker ? 'Candidato' :
                 user.role === UserRole.Employer ? 'Empleador' :
                 user.role === UserRole.Admin ? 'Administrador' :
                 user.role === UserRole.Moderator ? 'Moderador' : 'Usuario'}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};