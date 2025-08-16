'use client';

import React from 'react';
import { useAuthStore } from '../../../presentation/stores/auth.store';
import { UserForm } from '../../../presentation/components/features/users/user-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Perfil - EmplekTo',
  description: 'Gestiona tu perfil personal',
};

/**
 * Página de perfil del usuario actual
 */
export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="text-gray-600">
          Gestiona tu información personal y configuración de cuenta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserForm 
            user={user}
            onSuccess={() => {
              // Optionally refresh user data
              console.log('Profile updated successfully');
            }}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Información de Cuenta
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Estado:</span>
                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Registro:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Proveedor:</span>
                <span className="ml-2 text-sm text-gray-900">
                  {user.authProviderName}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Email verificado:</span>
                <span className={`ml-2 text-sm ${
                  user.emailConfirmed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {user.emailConfirmed ? 'Sí' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}