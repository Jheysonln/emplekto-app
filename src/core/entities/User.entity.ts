export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
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
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  roleName: string;
}

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profilePicture?: string;
}