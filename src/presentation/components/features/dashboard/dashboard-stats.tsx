'use client';

import { useAuthStore } from '@/presentation/stores/auth.store';
import { APP_CONFIG } from '@/shared/constants/app.constants';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} mr-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente de estadísticas del dashboard
 */
export function DashboardStats() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Total Usuarios',
      value: '1,234',
      icon: '👥',
      color: 'bg-blue-100',
    },
    {
      title: 'Empleos Activos',
      value: '456',
      icon: '💼',
      color: 'bg-green-100',
    },
    {
      title: 'Aplicaciones',
      value: '789',
      icon: '📄',
      color: 'bg-yellow-100',
    },
    {
      title: 'Empresas',
      value: '123',
      icon: '🏢',
      color: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          ¡Hola, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600">
          Bienvenido a tu dashboard de {APP_CONFIG.NAME}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
        <div className="space-y-3">
          <div className="flex items-center py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">
              Nuevo usuario registrado hace 5 minutos
            </span>
          </div>
          <div className="flex items-center py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">
              Nueva aplicación recibida hace 10 minutos
            </span>
          </div>
          <div className="flex items-center py-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">
              Empleo publicado hace 1 hora
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
