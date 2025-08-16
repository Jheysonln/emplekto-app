'use client';

import { useAuth } from '@/presentation/hooks/use-auth';
import React, { useState } from 'react';
import { Button } from '../../ui/button';


interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  showConfirm?: boolean;
}

/**
 * Botón de logout con confirmación opcional
 */
export function LogoutButton({ 
  variant = 'outline', 
  size = 'sm', 
  showConfirm = true 
}: LogoutButtonProps) {
  const { logout, isLogoutPending } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleLogout = () => {
    if (showConfirm) {
      setShowConfirmDialog(true);
    } else {
      logout();
    }
  };

  const confirmLogout = () => {
    setShowConfirmDialog(false);
    logout();
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleLogout}
        loading={isLogoutPending}
        disabled={isLogoutPending}
      >
        Cerrar Sesión
      </Button>

      {/* Simple confirmation dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirmar Logout</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro que quieres cerrar la sesión?
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={confirmLogout}
                className="flex-1"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}