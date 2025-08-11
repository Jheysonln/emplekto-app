export const ROUTES = {
  HOME: '/',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  
  // User management (Admin)
  USERS: '/users',
  USER_DETAIL: (id: number) => `/users/${id}`,
  
  // Job routes (futuro)
  JOBS: '/jobs',
  JOB_DETAIL: (id: number) => `/jobs/${id}`,
  POST_JOB: '/jobs/post',
  MY_JOBS: '/my-jobs',
  
  // Company routes (futuro)
  COMPANIES: '/companies',
  COMPANY_DETAIL: (id: number) => `/companies/${id}`,
  
  // Settings
  SETTINGS: '/settings',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
] as const;

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.USERS,
  ROUTES.MY_JOBS,
  ROUTES.SETTINGS,
] as const;