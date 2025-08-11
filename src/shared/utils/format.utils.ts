import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea una fecha a string legible
 */
export const formatDate = (date: string | Date, formatStr = 'dd/MM/yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: es });
};

/**
 * Formatea una fecha como tiempo relativo (hace X tiempo)
 */
export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
};

/**
 * Formatea nombre completo
 */
export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

/**
 * Formatea iniciales de nombre
 */
export const formatInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

/**
 * Formatea rol de usuario
 */
export const formatUserRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    'JobSeeker': 'Candidato',
    'Employer': 'Empleador',
    'Admin': 'Administrador',
    'Moderator': 'Moderador',
  };
  
  return roleMap[role] || role;
};