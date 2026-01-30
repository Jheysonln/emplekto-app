import { AuthSession, AuthTokens, User } from "@/core/entities";
import { AuthResponse, UserDto } from "@/shared/types/auth.types";

/**
 * Mappers para convertir entre DTOs de API y Entities del dominio
 */
export class AuthMapper {
  /**
   * Convierte AuthResponse (DTO) a AuthSession (Entity)
   */
  static toAuthSession(dto: AuthResponse): AuthSession {
    return {
      user: this.toUserEntity(dto.user),
      tokens: this.toAuthTokens(dto),
      isAuthenticated: true,
    };
  }

  /**
   * Convierte datos de AuthResponse a AuthTokens
   */
  static toAuthTokens(dto: AuthResponse): AuthTokens {
    return {
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      expiresAt: new Date(dto.expiresAt),
    };
  }

  /**
   * Convierte UserDto a User Entity
   */
  static toUserEntity(dto: UserDto): User {
    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
      profilePicture: dto.profilePicture,
      roleId: dto.roleId,
      roleName: dto.roleName,
      roleDisplayName: dto.roleDisplayName,
      authProviderId: dto.authProviderId,
      authProviderName: dto.authProviderName,
      externalId: dto.externalId,
      isActive: dto.isActive,
      emailConfirmed: dto.emailConfirmed,
      createdAt: new Date(dto.createdAt),
      lastLoginAt: dto.lastLoginAt ? new Date(dto.lastLoginAt) : undefined,
    };
  }
}