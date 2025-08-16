'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useUsers } from '../../../../presentation/hooks/use-users';
import { UserForm } from '../../../../presentation/components/features/users/user-form';
import { AuthGuard } from '../../../../presentation/guards/auth-guard';
import { Button } from '../../../../presentation/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '../../../../shared/constants/app.constants';

/**
 * Página de detalle/edición de usuario específico
 */
export default function UserDetailPage() {
  const params = useParams();
  const userId = parseInt(params.id as string);
  const { useUser } = useUsers();
  
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Usuario no encontrado
        </h2>
        <p className="text-gray-600 mb-4">
          El usuario que buscas no existe o no tienes permisos para verlo.
        </p>
        <Link href={ROUTES.USERS}>
          <Button variant="outline">Volver a Usuarios</Button>
        </Link>
      </div>
    );
  }

  return (
    <AuthGuard requiredRoles={['Admin', 'Moderator']}>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-4">
          <Link href={ROUTES.USERS}>
            <Button variant="outline" size="sm">
              ← Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <UserForm user={user} />
      </div>
    </AuthGuard>
  );
}
