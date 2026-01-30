import { ID } from "../types/common.types";

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5076/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    GOOGLE_LOGIN: '/auth/google-login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    VALIDATE: '/auth/validate',
  },
  
  // Users endpoints
  USERS: {
    BASE: '/users',
    BY_ID: (id: ID) => `/users/${id}`,
    ACTIVATE: (id: ID) => `/users/${id}/activate`,
    DEACTIVATE: (id: ID) => `/users/${id}/deactivate`,
  },
} as const;

export const HTTP_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  USER_AGENT: 'User-Agent',
} as const;

export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
} as const;
