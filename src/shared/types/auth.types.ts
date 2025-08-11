export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: UserRole;
  roleName: string;
  authProvider: AuthProvider;
  isActive: boolean;
  emailConfirmed: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export enum UserRole {
  JobSeeker = 1,
  Employer = 2,
  Admin = 3,
  Moderator = 4,
}

export enum AuthProvider {
  Local = 1,
  Google = 2,
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface GoogleLoginRequest {
  googleToken: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
