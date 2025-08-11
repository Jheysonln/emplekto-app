import { VALIDATION_RULES } from '@/shared/constants/app.constants';

/**
 * Valida email usando regex
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida password
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};

/**
 * Valida teléfono (formato simple)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Valida nombre (solo letras y espacios)
 */
export const isValidName = (name: string): boolean => {
  if (name.length < VALIDATION_RULES.NAME_MIN_LENGTH || 
      name.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    return false;
  }
  
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return nameRegex.test(name);
};