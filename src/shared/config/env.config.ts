interface AppConfig {
  apiUrl: string;
  appName: string;
  googleClientId?: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export const ENV_CONFIG: AppConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5076/api',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'EmplekTo',
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Validation
if (!ENV_CONFIG.apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is required');
}

if (ENV_CONFIG.isProduction && !ENV_CONFIG.googleClientId) {
  console.warn('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set - Google auth will not work');
}
