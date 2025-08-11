export const APP_CONFIG = {
  NAME: 'JobPlatform',
  DESCRIPTION: 'Plataforma de empleo moderna y fácil de usar',
  VERSION: '1.0.0',
  AUTHOR: 'JobPlatform Team',
  SUPPORT_EMAIL: 'support@jobplatform.com',
} as const;

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  PHONE_MAX_LENGTH: 20,
} as const;
