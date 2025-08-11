export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    GOOGLE_LOGIN: '/auth/google-login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    VALIDATE: '/auth/validate',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: number) => `/users/${id}`,
    DEACTIVATE: (id: number) => `/users/${id}/deactivate`,
    ACTIVATE: (id: number) => `/users/${id}/activate`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
