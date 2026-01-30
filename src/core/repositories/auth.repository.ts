import { AuthSession, GoogleLoginData, LoginCredentials, RefreshTokenData } from "../entities/Auth.entity";
import { CreateUserData, User } from "../entities/User.entity";

/**
 * Repository interface para operaciones de autenticación
 * Define QUÉ se puede hacer, no CÓMO se hace
 */
export interface AuthRepository {
  // Login tradicional
  login(credentials: LoginCredentials): Promise<AuthSession>;
  
  // Login con Google
  loginWithGoogle(data: GoogleLoginData): Promise<AuthSession>;
  
  // Registro
  register(userData: CreateUserData): Promise<AuthSession>;
  
  // Refresh token
  refreshToken(data: RefreshTokenData): Promise<AuthSession>;
  
  // Logout
  logout(refreshToken: string): Promise<void>;
  
  // Validar token actual
  validateToken(): Promise<boolean>;
  
  // Obtener usuario actual
  getCurrentUser(): Promise<User>;
}