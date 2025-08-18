// src/app/(auth)/register/page.tsx
import React from 'react';
import { AuthLayout } from '../../../presentation/components/layouts/auth-layout';
import type { Metadata } from 'next';
import { RegisterForm } from '@/presentation/components/features/auth/register-form';

export const metadata: Metadata = {
  title: 'Crear Cuenta - EmplekTo',
  description: 'Únete a nuestra plataforma de empleos',
};

/**
 * Página de registro premium
 */
export default function RegisterPage() {

  return (
    <AuthLayout 
      title="Crear Cuenta" 
      subtitle="Únete a miles de profesionales exitosos"
    >
     <RegisterForm />
    </AuthLayout>
  );
}