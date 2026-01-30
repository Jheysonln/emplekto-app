import { z } from 'zod';

/**
 * Schema para login tradicional
 */
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email es requerido')
        .email('Email no válido'),
    password: z
        .string()
        .min(6, 'Password debe tener al menos 6 caracteres')
        .max(100, 'Password no puede tener más de 100 caracteres'),
    rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Schema para registro
 */
export const registerSchema = z.object({
    email: z
        .string()
        .min(1, 'Email es requerido')
        .email('Email no válido'),
    password: z
        .string()
        .min(6, 'Password debe tener al menos 6 caracteres')
        .max(100, 'Password no puede tener más de 100 caracteres'),
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
        .optional(),
    roleName: z.enum(['JobSeeker', 'Employer'])
        .refine((val) => !!val, { message: 'Rol es requerido' }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Schema para Google login
 */
export const googleLoginSchema = z.object({
    googleToken: z.string().min(1, 'Token de Google requerido'),
    rememberMe: z.boolean().optional().default(false),
});

export type GoogleLoginFormData = z.infer<typeof googleLoginSchema>;