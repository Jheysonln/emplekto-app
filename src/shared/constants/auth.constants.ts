export const AUTH_CONFIG = {
  TOKEN_STORAGE_KEY: 'auth-token',
  REFRESH_TOKEN_STORAGE_KEY: 'refresh-token',
  USER_STORAGE_KEY: 'user-data',
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutos antes de expirar
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  TOKEN_EXPIRED: 'Token expirado',
  UNAUTHORIZED: 'No autorizado',
  FORBIDDEN: 'Acceso prohibido',
  NETWORK_ERROR: 'Error de conexión',
  UNKNOWN_ERROR: 'Error desconocido',
} as const;