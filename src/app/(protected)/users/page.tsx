'use client';

import React, { useState } from 'react';
import { UsersTable } from '../../../presentation/components/features/users/users-table';
import { UserForm } from '../../../presentation/components/features/users/user-form';
import { AuthGuard } from '../../../presentation/guards/auth-guard';
import { Button } from '../../../presentation/components/ui/button';
import type { User } from '../../../core/entities';

/**
 * Página de gestión de usuarios
 */
export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleFormClose = () => {
    setSelectedUser(null);
    setShowUserForm(false);
  };

  return (
    <AuthGuard requiredRoles={['Admin', 'Moderator']}>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Usuarios
            </h1>
            <p className="text-gray-600">
              Administra los usuarios de la plataforma
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users Table */}
          <div className="lg:col-span-2">
            <UsersTable onUserSelect={handleUserSelect} />
          </div>

          {/* User Form */}
          <div className="lg:col-span-1">
            {showUserForm && selectedUser ? (
              <UserForm
                user={selectedUser}
                onSuccess={handleFormClose}
                onCancel={handleFormClose}
              />
            ) : (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información del Usuario
                </h3>
                <p className="text-gray-600">
                  Selecciona un usuario de la tabla para ver y editar su información.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}