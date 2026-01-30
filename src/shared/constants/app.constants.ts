import { ID, PaginationParams } from "../types/common.types";

export const APP_CONFIG = {
  NAME: 'EmplekTo',
  DESCRIPTION: 'Plataforma de empleo moderna',
  VERSION: '1.0.0',
} as const;

export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  USERS: '/users',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Public routes
  HOME: '/',
  ABOUT: '/about',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  REFRESH_TOKEN: 'refresh-token',
  USER: 'user',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',
} as const;

export const QUERY_KEYS = {
  // Auth
  AUTH_USER: ['auth', 'user'],
  AUTH_VALIDATE: ['auth', 'validate'],
  
  // Users
  USERS: ['users'],
  USER: (id: ID) => ['users', id],
  USERS_PAGINATED: (params: PaginationParams) => ['users', 'paginated', params],
} as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 10,
} as const;

export const ROLES = {
  JOB_SEEKER: 'JobSeeker',
  EMPLOYER: 'Employer',
  ADMIN: 'Admin',
  MODERATOR: 'Moderator',
} as const;