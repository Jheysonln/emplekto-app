import React from 'react';
import Link from 'next/link';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Search, Users, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/shared/constants/routes.constants';

/**
 * Página principal/landing page
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary">
            JobPlatform
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground">
              Características
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground">
              Acerca de
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href={ROUTES.LOGIN}>Iniciar sesión</Link>
            </Button>
            <Button asChild>
              <Link href={ROUTES.REGISTER}>Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encuentra tu <span className="text-primary">trabajo ideal</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conectamos talento excepcional con oportunidades extraordinarias. 
            Construye tu carrera profesional con nosotros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={ROUTES.REGISTER}>
                Buscar empleos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.REGISTER}>
                Publicar oferta
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir JobPlatform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestra plataforma está diseñada para hacer que la búsqueda de empleo 
              y contratación sea más eficiente y efectiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Search className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Búsqueda inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Encuentra oportunidades que se ajusten perfectamente a tu perfil y experiencia.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Red profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conecta con profesionales y empresas líderes en tu industria.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Empresas verificadas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Todas las empresas pasan por un proceso de verificación riguroso.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Crecimiento profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Accede a recursos y herramientas para impulsar tu carrera.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de profesionales que ya encontraron su oportunidad ideal.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={ROUTES.REGISTER}>
              Crear cuenta gratis
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl text-primary mb-4">
                JobPlatform
              </div>
              <p className="text-muted-foreground">
                La plataforma de empleo que conecta talento con oportunidades.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Candidatos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Buscar empleos</Link></li>
                <li><Link href="#" className="hover:text-foreground">Mi perfil</Link></li>
                <li><Link href="#" className="hover:text-foreground">Alertas de empleo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empleadores</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Publicar oferta</Link></li>
                <li><Link href="#" className="hover:text-foreground">Buscar candidatos</Link></li>
                <li><Link href="#" className="hover:text-foreground">Planes y precios</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Centro de ayuda</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contacto</Link></li>
                <li><Link href="#" className="hover:text-foreground">Términos de uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 JobPlatform. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}