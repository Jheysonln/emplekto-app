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
  roleName: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  profilePicture?: string;
  roleId: number;
  roleName: string;
  roleDisplayName: string;
  authProviderId: number;
  authProviderName: string;
  externalId?: string;
  isActive: boolean;
  emailConfirmed: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profilePicture?: string;
}

export enum UserRole {
  JobSeeker = 'JobSeeker',
  Employer = 'Employer',
  Admin = 'Admin',
  Moderator = 'Moderator',
}

export enum AuthProvider {
  Local = 'Local',
  Google = 'Google',
}
