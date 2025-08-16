import { z } from 'zod';

/**
 * Schema para actualizar usuario
 */
export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre no puede tener más de 100 caracteres'),
  lastName: z
    .string()
    .min(2, 'Apellido debe tener al menos 2 caracteres')
    .max(100, 'Apellido no puede tener más de 100 caracteres'),
  phoneNumber: z
    .string()
    .max(20, 'Teléfono no puede tener más de 20 caracteres')
    .optional()
    .or(z.literal('')),
  profilePicture: z
    .string()
    .url('URL de imagen no válida')
    .optional()
    .or(z.literal('')),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

/**
 * Schema para filtros de usuarios
 */
export const userFiltersSchema = z.object({
  search: z.string().optional(),
  roleName: z.enum(['JobSeeker', 'Employer', 'Admin', 'Moderator']).optional(),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
});

export type UserFiltersFormData = z.infer<typeof userFiltersSchema>;