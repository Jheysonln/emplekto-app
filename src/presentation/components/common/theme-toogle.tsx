'use client';

import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { useTheme } from '@/presentation/hooks/common/use-theme';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/ui/dialog';

/**
 * Botón para cambiar entre temas (light/dark/system)
 */
export const ThemeToggle: React.FC = () => {
  const { theme, setLightTheme, setDarkTheme, setSystemTheme, isDark } = useTheme();
  const [open, setOpen] = React.useState(false);

  const themeOptions = [
    {
      key: 'light',
      label: 'Claro',
      icon: Sun,
      action: setLightTheme,
      active: theme === 'light',
    },
    {
      key: 'dark',
      label: 'Oscuro', 
      icon: Moon,
      action: setDarkTheme,
      active: theme === 'dark',
    },
    {
      key: 'system',
      label: 'Sistema',
      icon: Monitor,
      action: setSystemTheme,
      active: theme === 'system',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-9 w-9"
          aria-label="Cambiar tema"
        >
          {isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Seleccionar tema</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.key}
                variant={option.active ? "default" : "outline"}
                className="flex flex-col gap-2 h-auto py-3"
                onClick={() => {
                  option.action();
                  setOpen(false);
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{option.label}</span>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};