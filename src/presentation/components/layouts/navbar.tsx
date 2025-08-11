'use client';

import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { ThemeToggle } from '@/presentation/components/common/theme-toogle';
import { UserMenu } from '@/presentation/components/features/auth/user-menu';
import { useMobileMenu } from '@/presentation/stores/ui.store';

/**
 * Barra de navegación superior
 */
export const Navbar: React.FC = () => {
  const { toggleMobileMenu } = useMobileMenu();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar empleos, empresas..."
              className="pl-9 w-64 lg:w-80"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search móvil */}
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-4 w-4" />
          </Button>

          {/* Notificaciones */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};