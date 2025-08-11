import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/presentation/components/common/theme-toogle';

/**
 * Layout para páginas de autenticación (login, register)
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar izquierdo con branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-8 bg-muted">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center text-2xl font-bold text-primary mb-8">
            JobPlatform
          </Link>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Únete a la comunidad profesional líder
            </h2>
            
            <blockquote className="border-l-4 border-primary pl-4">
              <p className="text-muted-foreground italic">
                "JobPlatform me ayudó a encontrar el trabajo perfecto en solo 2 semanas. 
                La plataforma es intuitiva y las oportunidades son de alta calidad."
              </p>
              <cite className="text-sm font-medium text-foreground mt-2 block">
                - María González, Desarrolladora Senior
              </cite>
            </blockquote>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                +10,000 empleos activos
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                +5,000 empresas registradas
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                +50,000 profesionales
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {/* Header móvil */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center justify-center text-2xl font-bold text-primary">
              JobPlatform
            </Link>
          </div>

          {/* Toggle de tema */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}