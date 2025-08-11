import { ApiClient } from '../base/api.client';
import { 
  LoginRequest, 
  GoogleLoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  RefreshTokenRequest,
  User 
} from '@/shared/types/auth.types';
import { ApiResponse } from '@/shared/types/api.types';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';

/**
 * Cliente HTTP para endpoints de autenticación
 */
export class AuthApiClient {
  constructor(private apiClient: ApiClient) {}

  /**
   * Login tradicional con email/password
   */
  async login(request: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return await this.apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, request);
  }

  /**
   * Login con Google OAuth
   */
  async loginWithGoogle(request: GoogleLoginRequest): Promise<ApiResponse<AuthResponse>> {
    return await this.apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, request);
  }

  /**
   * Registro de nuevo usuario
   */
  async register(request: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return await this.apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, request);
  }

  /**
   * Refrescar access token
   */
  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    return await this.apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH);
  }

  /**
   * Logout
   */
  async logout(): Promise<ApiResponse<boolean>> {
    return await this.apiClient.post<boolean>(API_ENDPOINTS.AUTH.LOGOUT);
  }

  /**
   * Obtener información del usuario actual
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return await this.apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  }

  /**
   * Validar token actual
   */
  async validateToken(): Promise<ApiResponse<{ isValid: boolean; userId: number }>> {
    return await this.apiClient.get<{ isValid: boolean; userId: number }>(API_ENDPOINTS.AUTH.VALIDATE);
  }
}