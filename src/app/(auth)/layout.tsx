import { AuthLayout } from '../../presentation/components/layouts/auth-layout';

/**
 * Layout para rutas de autenticación
 * Aplicará el AuthLayout a todas las páginas en (auth)/
 */
export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}