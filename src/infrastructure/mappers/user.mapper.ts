import { PaginatedResponse } from "@/core/entities";
import { UpdateUserData, User } from "@/core/entities/User.entity";
import { UpdateUserRequest, UserDto } from "@/shared/types/auth.types";

/**
 * Mappers para operaciones de usuarios
 */
export class UserMapper {
  /**
   * Convierte UserDto a User Entity
   */
  static toEntity(dto: UserDto): User {
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

  /**
   * Convierte UpdateUserData a UpdateUserRequest
   */
  static toUpdateRequest(data: UpdateUserData): UpdateUserRequest {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      profilePicture: data.profilePicture,
    };
  }

  /**
   * Convierte PaginatedResponse<UserDto> a PaginatedResponse<User>
   */
  static toPaginatedEntities(dto: PaginatedResponse<UserDto>): PaginatedResponse<User> {
    return {
      items: dto.items.map(this.toEntity),
      totalItems: dto.totalItems,
      currentPage: dto.currentPage,
      pageSize: dto.pageSize,
      totalPages: dto.totalPages,
      hasNextPage: dto.hasNextPage,
      hasPreviousPage: dto.hasPreviousPage,
    };
  }
}