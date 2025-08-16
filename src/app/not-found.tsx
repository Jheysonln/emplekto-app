import Link from 'next/link';
import { Button } from '../presentation/components/ui/button';
import { ROUTES } from '../shared/constants/app.constants';

/**
 * Página 404 - Not Found
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
        </p>
        <div className="space-x-4">
          <Link href={ROUTES.HOME}>
            <Button>Ir al Inicio</Button>
          </Link>
          <Link href={ROUTES.DASHBOARD}>
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
