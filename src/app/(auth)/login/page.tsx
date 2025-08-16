import { LoginForm } from '../../../presentation/components/features/auth/login-form';
import { AuthLayout } from '../../../presentation/components/layouts/auth-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión - EmplekTo',
  description: 'Inicia sesión en tu cuenta de EmplekTo',
};

/**
 * Página de login
 */
export default function LoginPage() {
  return (
    <AuthLayout 
      title="Iniciar Sesión" 
      subtitle="Ingresa a tu cuenta para continuar"
    >
      <LoginForm />
    </AuthLayout>
  );
}