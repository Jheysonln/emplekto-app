import { z } from 'zod';
import { VALIDATION_RULES } from '@/shared/constants/app.constants';
import { UserRole } from '@/shared/types/auth.types';

/**
 * Schema de validación para login
 */
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'El email es requerido')
        .email('Ingresa un email válido')
        .max(VALIDATION_RULES.EMAIL_MAX_LENGTH, `El email no puede tener más de ${VALIDATION_RULES.EMAIL_MAX_LENGTH} caracteres`),

    password: z
        .string()
        .min(1, 'La contraseña es requerida')
        .min(VALIDATION_RULES.PASSWORD_MIN_LENGTH, `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres`),

    rememberMe: z.boolean().default(false),
});

/**
 * Schema de validación para registro
 */
export const registerSchema = z.object({
    email: z
        .string()
        .min(1, 'El email es requerido')
        .email('Ingresa un email válido')
        .max(VALIDATION_RULES.EMAIL_MAX_LENGTH, `El email no puede tener más de ${VALIDATION_RULES.EMAIL_MAX_LENGTH} caracteres`),

    password: z
        .string()
        .min(VALIDATION_RULES.PASSWORD_MIN_LENGTH, `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres`)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos: una minúscula, una mayúscula y un número'),

    confirmPassword: z
        .string()
        .min(1, 'Confirma tu contraseña'),

    firstName: z
        .string()
        .min(VALIDATION_RULES.NAME_MIN_LENGTH, `El nombre debe tener al menos ${VALIDATION_RULES.NAME_MIN_LENGTH} caracteres`)
        .max(VALIDATION_RULES.NAME_MAX_LENGTH, `El nombre no puede tener más de ${VALIDATION_RULES.NAME_MAX_LENGTH} caracteres`)
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),

    lastName: z
        .string()
        .min(VALIDATION_RULES.NAME_MIN_LENGTH, `El apellido debe tener al menos ${VALIDATION_RULES.NAME_MIN_LENGTH} caracteres`)
        .max(VALIDATION_RULES.NAME_MAX_LENGTH, `El apellido no puede tener más de ${VALIDATION_RULES.NAME_MAX_LENGTH} caracteres`)
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios'),

    phoneNumber: z
        .string()
        .regex(/^[\+]?[\d\s\-\(\)]{10,}$/, 'Ingresa un número de teléfono válido')
        .optional()
        .or(z.literal('')),

    role: z.nativeEnum(UserRole)
        .refine((val) => Object.values(UserRole).includes(val), {
            message: 'Selecciona un tipo de usuario válido',
        }),

    acceptTerms: z
        .boolean()
        .refine(val => val === true, 'Debes aceptar los términos y condiciones'),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
});

/**
 * Schema de validación para actualizar perfil
 */
export const updateProfileSchema = z.object({
    firstName: z
        .string()
        .min(VALIDATION_RULES.NAME_MIN_LENGTH, `El nombre debe tener al menos ${VALIDATION_RULES.NAME_MIN_LENGTH} caracteres`)
        .max(VALIDATION_RULES.NAME_MAX_LENGTH, `El nombre no puede tener más de ${VALIDATION_RULES.NAME_MAX_LENGTH} caracteres`)
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),

    lastName: z
        .string()
        .min(VALIDATION_RULES.NAME_MIN_LENGTH, `El apellido debe tener al menos ${VALIDATION_RULES.NAME_MIN_LENGTH} caracteres`)
        .max(VALIDATION_RULES.NAME_MAX_LENGTH, `El apellido no puede tener más de ${VALIDATION_RULES.NAME_MAX_LENGTH} caracteres`)
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios'),

    phoneNumber: z
        .string()
        .regex(/^[\+]?[\d\s\-\(\)]{10,}$/, 'Ingresa un número de teléfono válido')
        .optional()
        .or(z.literal('')),

    profilePicture: z
        .string()
        .url('Ingresa una URL válida para la foto de perfil')
        .optional()
        .or(z.literal('')),
});

// Tipos TypeScript derivados de los schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
