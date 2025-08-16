import { AuthResponse, GoogleLoginRequest, LoginRequest, RefreshTokenRequest, RegisterRequest, UserDto } from "@/shared/types/auth.types";
import { BaseApiClient } from "./base-api.client";
import { API_ENDPOINTS } from "@/shared/constants/api.constants";
import { ApiResponse } from "@/shared/types/api.types";

/**
 * Cliente API para operaciones de autenticación
 */
export class AuthApiClient extends BaseApiClient {
  /**
   * Login tradicional
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  /**
   * Login con Google
   */
  async loginWithGoogle(data: GoogleLoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, data);
  }

  /**
   * Registro de usuario
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  /**
   * Refresh token
   */
  async refreshToken(data: RefreshTokenRequest): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, data);
  }

  /**
   * Logout
   */
  async logout(): Promise<ApiResponse<boolean>> {
    return this.post<boolean>(API_ENDPOINTS.AUTH.LOGOUT);
  }

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<ApiResponse<UserDto>> {
    return this.get<UserDto>(API_ENDPOINTS.AUTH.ME);
  }

  /**
   * Validar token actual
   */
  async validateToken(): Promise<ApiResponse<{ isValid: boolean }>> {
    return this.get<{ isValid: boolean }>(API_ENDPOINTS.AUTH.VALIDATE);
  }
}