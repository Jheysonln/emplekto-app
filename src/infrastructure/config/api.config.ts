import { ApiClient } from '../http-clients/base/api.client';
import { AuthApiClient } from '../http-clients/dotnet-apis/auth-api.client';
import { UserApiClient } from '../http-clients/dotnet-apis/user-api.client';

/**
 * Configuración centralizada de clientes API
 */
class ApiConfig {
  private baseApiClient: ApiClient;
  private _authApi?: AuthApiClient;
  private _userApi?: UserApiClient;

  constructor() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    this.baseApiClient = new ApiClient(apiUrl);
  }

  /**
   * Cliente API para autenticación
   */
  get authApi(): AuthApiClient {
    if (!this._authApi) {
      this._authApi = new AuthApiClient(this.baseApiClient);
    }
    return this._authApi;
  }

  /**
   * Cliente API para usuarios
   */
  get userApi(): UserApiClient {
    if (!this._userApi) {
      this._userApi = new UserApiClient(this.baseApiClient);
    }
    return this._userApi;
  }
}

// Singleton instance
export const apiConfig = new ApiConfig();

// Exportar clientes individuales para facilidad de uso
export const authApi = apiConfig.authApi;
export const userApi = apiConfig.userApi;

// src/infrastructure/config/env.config.ts
/**
 * Configuración de variables de entorno con validación
 */
export const envConfig = {
  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  
  // App
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'JobPlatform',
  environment: process.env.NODE_ENV || 'development',
  
  // Google OAuth
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  
  // Validación de configuración crítica
  validate() {
    const requiredVars = [
      { key: 'NEXT_PUBLIC_API_URL', value: this.apiUrl },
      { key: 'NEXT_PUBLIC_GOOGLE_CLIENT_ID', value: this.googleClientId },
    ];

    const missing = requiredVars.filter(({ value }) => !value);
    
    if (missing.length > 0) {
      const missingKeys = missing.map(({ key }) => key).join(', ');
      throw new Error(`Missing required environment variables: ${missingKeys}`);
    }
  },
  
  // Helpers
  isDevelopment: () => process.env.NODE_ENV === 'development',
  isProduction: () => process.env.NODE_ENV === 'production',
  isServer: () => typeof window === 'undefined',
  isClient: () => typeof window !== 'undefined',
};

// Validar configuración al importar (solo en cliente)
if (typeof window !== 'undefined') {
  try {
    envConfig.validate();
  } catch (error) {
    console.error('Environment configuration error:', error);
  }
}