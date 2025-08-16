import Link from 'next/link';
import { Button } from '../presentation/components/ui/button';
import { APP_CONFIG, ROUTES } from '../shared/constants/app.constants';

/**
 * Página de inicio/landing page
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenido a {APP_CONFIG.NAME}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {APP_CONFIG.DESCRIPTION}. Conectamos talento con oportunidades de manera moderna y eficiente.
          </p>
          
          <div className="space-x-4">
            <Link href={ROUTES.LOGIN}>
              <Button size="lg">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href={ROUTES.REGISTER}>
              <Button variant="outline" size="lg">
                Crear Cuenta
              </Button>
            </Link>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Para Candidatos</h3>
            <p className="text-gray-600">
              Encuentra las mejores oportunidades laborales adaptadas a tu perfil profesional.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Para Empresas</h3>
            <p className="text-gray-600">
              Publica ofertas de trabajo y encuentra el talento que necesitas para tu equipo.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Proceso Rápido</h3>
            <p className="text-gray-600">
              Plataforma moderna con tecnología de última generación para una experiencia óptima.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
