import { User } from "./User.entity";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface GoogleLoginData {
  googleToken: string;
  rememberMe?: boolean;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
  isAuthenticated: boolean;
}

export interface RefreshTokenData {
  refreshToken: string;
}