import { AuthGuard } from '../../presentation/guards/auth-guard';
import { MainLayout } from '../../presentation/components/layouts/main-layout';

/**
 * Layout para rutas protegidas
 * Requiere autenticación y aplica MainLayout
 */
export default function ProtectedGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <MainLayout>
        {children}
      </MainLayout>
    </AuthGuard>
  );
}