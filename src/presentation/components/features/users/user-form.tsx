'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/core/entities';
import { useUsers } from '@/presentation/hooks/use-users';
import { UpdateUserFormData, updateUserSchema } from '@/presentation/validators/user.schemas';
import { Form, FormField } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface UserFormProps {
  user: User;
  onSuccess?: () => void;
  onCancel?: () => void;
}

/**
 * Formulario para editar usuario
 */
export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const { updateUser, isUpdating } = useUsers();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber || '',
      profilePicture: user.profilePicture || '',
    },
  });

  const onSubmit = (data: UpdateUserFormData) => {
    updateUser(
      { id: user.id, data },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Editar Usuario
        </h2>
        <p className="text-sm text-gray-600">
          Actualiza la información de {user.firstName} {user.lastName}
        </p>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField>
            <Input
              {...register('firstName')}
              label="Nombre"
              placeholder="Nombre"
              error={errors.firstName?.message}
              required
            />
          </FormField>

          <FormField>
            <Input
              {...register('lastName')}
              label="Apellido"
              placeholder="Apellido"
              error={errors.lastName?.message}
              required
            />
          </FormField>

          <FormField>
            <Input
              {...register('phoneNumber')}
              label="Teléfono"
              placeholder="+51 123 456 789"
              error={errors.phoneNumber?.message}
            />
          </FormField>

          <FormField>
            <Input
              {...register('profilePicture')}
              label="Foto de Perfil (URL)"
              placeholder="https://..."
              error={errors.profilePicture?.message}
            />
          </FormField>
        </div>

        {/* Read-only fields */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-500">
              {user.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-500">
              {user.roleDisplayName}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            loading={isUpdating}
            disabled={isUpdating}
          >
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </div>
  );
}
