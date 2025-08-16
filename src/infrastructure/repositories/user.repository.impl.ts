import { UserApiClient } from '../api/clients/user-api.client';
import { UserMapper } from '../mappers/user.mapper';
import type { UserRepository } from '../../core/repositories/user.repository';
import type { User, UpdateUserData, PaginatedResponse, PaginationParams } from '../../core/entities';

/**
 * Implementación del UserRepository usando API calls
 */
export class UserRepositoryImpl implements UserRepository {
  constructor(private apiClient: UserApiClient) {}

  async getById(id: number): Promise<User> {
    const response = await this.apiClient.getById(id);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Usuario no encontrado');
    }

    return UserMapper.toEntity(response.data);
  }

  async getAll(params: PaginationParams, roleName?: string): Promise<PaginatedResponse<User>> {
    const response = await this.apiClient.getAll(params, roleName);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error obteniendo usuarios');
    }

    return UserMapper.toPaginatedEntities(response.data);
  }

  async update(id: number, data: UpdateUserData): Promise<User> {
    const request = UserMapper.toUpdateRequest(data);
    const response = await this.apiClient.update(id, request);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error actualizando usuario');
    }

    return UserMapper.toEntity(response.data);
  }

  async activate(id: number): Promise<boolean> {
    const response = await this.apiClient.activate(id);
    
    if (!response.success) {
      throw new Error(response.message || 'Error activando usuario');
    }

    return response.data === true;
  }

  async deactivate(id: number): Promise<boolean> {
    const response = await this.apiClient.deactivate(id);
    
    if (!response.success) {
      throw new Error(response.message || 'Error desactivando usuario');
    }

    return response.data === true;
  }
}
