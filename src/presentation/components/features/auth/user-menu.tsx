'use client';

import React from 'react';
import Link from 'next/link';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield,
  ChevronDown 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import { Button } from '@/presentation/components/ui/button';
import { useAuth } from '@/presentation/hooks/auth/use-auth';
import { ROUTES } from '@/shared/constants/routes.constants';
import { formatUserRole } from '@/shared/utils/format.utils';

/**
 * Menú desplegable del usuario autenticado
 */
export const UserMenu: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
  };

  const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            {userInitials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatUserRole(user.roleName)}
            </div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href={ROUTES.PROFILE} className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Mi Perfil
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href={ROUTES.SETTINGS} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
        </DropdownMenuItem>
        
        {(user.roleName === 'Admin' || user.roleName === 'Moderator') && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={ROUTES.USERS} className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Panel de Admin
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};