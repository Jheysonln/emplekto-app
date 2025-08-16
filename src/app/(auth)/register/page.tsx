'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../presentation/hooks/use-auth';
import { registerSchema, type RegisterFormData } from '../../../presentation/validators/auth.schemas';
import { Button } from '../../../presentation/components/ui/button';
import { Input } from '../../../presentation/components/ui/input';
import { Form, FormField, FormError } from '../../../presentation/components/ui/form';
import { AuthLayout } from '../../../presentation/components/layouts/auth-layout';
import Link from 'next/link';
import { ROUTES } from '../../../shared/constants/app.constants';

/**
 * Página de registro
 */
export default function RegisterPage() {
  const { register: registerUser, isRegisterPending, error, clearError } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      roleName: 'JobSeeker',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    clearError();
    registerUser(data);
  };

  return (
    <AuthLayout 
      title="Crear Cuenta" 
      subtitle="Únete a nuestra plataforma de empleos"
    >
      <div className="space-y-6">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <FormField>
              <Input
                {...register('firstName')}
                label="Nombre"
                placeholder="Tu nombre"
                error={errors.firstName?.message}
                required
              />
            </FormField>

            <FormField>
              <Input
                {...register('lastName')}
                label="Apellido"
                placeholder="Tu apellido"
                error={errors.lastName?.message}
                required
              />
            </FormField>

            <FormField>
              <Input
                {...register('email')}
                type="email"
                label="Email"
                placeholder="tu@email.com"
                error={errors.email?.message}
                required
              />
            </FormField>

            <FormField>
              <Input
                {...register('password')}
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                error={errors.password?.message}
                required
              />
            </FormField>

            <FormField>
              <Input
                {...register('phoneNumber')}
                label="Teléfono (Opcional)"
                placeholder="+51 123 456 789"
                error={errors.phoneNumber?.message}
              />
            </FormField>

            <FormField>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de cuenta *
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    {...register('roleName')}
                    type="radio"
                    value="JobSeeker"
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Busco empleo - Soy candidato
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('roleName')}
                    type="radio"
                    value="Employer"
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Publico empleos - Soy empleador
                  </span>
                </label>
              </div>
              {errors.roleName && (
                <p className="text-sm text-red-600">{errors.roleName.message}</p>
              )}
            </FormField>
          </div>

          {error && <FormError message={error} />}

          <Button
            type="submit"
            className="w-full"
            loading={isRegisterPending}
            disabled={isRegisterPending}
          >
            Crear Cuenta
          </Button>
        </Form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}