import { AuthApiClient } from '../api/clients/auth-api.client';
import { AuthMapper } from '../mappers/auth.mapper';
import type { AuthRepository } from '../../core/repositories/auth.repository';
import type { 
  LoginCredentials, 
  GoogleLoginData, 
  AuthSession, 
  RefreshTokenData,
  CreateUserData,
  User
} from '../../core/entities';
import { LoginRequest, GoogleLoginRequest, RegisterRequest, RefreshTokenRequest } from '@/shared/types/auth.types';

/**
 * Implementación del AuthRepository usando API calls
 */
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private apiClient: AuthApiClient) {}

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const request: LoginRequest = {
      email: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe,
    };

    const response = await this.apiClient.login(request);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error en login');
    }

    const session = AuthMapper.toAuthSession(response.data);
    
    // Configurar token en el cliente API para siguientes requests
    this.apiClient.setAuthToken(session.tokens.accessToken);
    
    return session;
  }

  async loginWithGoogle(data: GoogleLoginData): Promise<AuthSession> {
    const request: GoogleLoginRequest = {
      googleToken: data.googleToken,
      rememberMe: data.rememberMe,
    };

    const response = await this.apiClient.loginWithGoogle(request);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error en login con Google');
    }

    const session = AuthMapper.toAuthSession(response.data);
    
    // Configurar token en el cliente API
    this.apiClient.setAuthToken(session.tokens.accessToken);
    
    return session;
  }

  async register(userData: CreateUserData): Promise<AuthSession> {
    const request: RegisterRequest = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      roleName: userData.roleName as any, // Cast necesario por el enum
    };

    const response = await this.apiClient.register(request);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error en registro');
    }

    const session = AuthMapper.toAuthSession(response.data);
    
    // Configurar token en el cliente API
    this.apiClient.setAuthToken(session.tokens.accessToken);
    
    return session;
  }

  async refreshToken(data: RefreshTokenData): Promise<AuthSession> {
    const request: RefreshTokenRequest = {
      refreshToken: data.refreshToken,
    };

    const response = await this.apiClient.refreshToken(request);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error renovando token');
    }

    const session = AuthMapper.toAuthSession(response.data);
    
    // Actualizar token en el cliente API
    this.apiClient.setAuthToken(session.tokens.accessToken);
    
    return session;
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      await this.apiClient.logout();
    } finally {
      // Siempre limpiar el token, aunque falle la llamada
      this.apiClient.clearAuthToken();
    }
  }

  async validateToken(): Promise<boolean> {
    try {
      const response = await this.apiClient.validateToken();
      return response.success && response.data?.isValid === true;
    } catch {
      return false;
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.apiClient.getCurrentUser();
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error obteniendo usuario actual');
    }

    return AuthMapper.toUserEntity(response.data);
  }
}
