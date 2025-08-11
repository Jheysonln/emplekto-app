import { ApiClient } from '../base/api.client';
import { User, UserRole } from '@/shared/types/auth.types';
import { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profilePicture?: string;
}

/**
 * Cliente HTTP para endpoints de usuarios
 */
export class UserApiClient {
  constructor(private apiClient: ApiClient) {}

  /**
   * Obtener lista paginada de usuarios
   */
  async getUsers(
    page: number = 1, 
    pageSize: number = 10, 
    role?: UserRole
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (role !== undefined) {
      params.append('role', role.toString());
    }

    return await this.apiClient.get<PaginatedResponse<User>>(
      `${API_ENDPOINTS.USERS.BASE}?${params.toString()}`
    );
  }

  /**
   * Obtener usuario por ID
   */
  async getUserById(id: number): Promise<ApiResponse<User>> {
    return await this.apiClient.get<User>(API_ENDPOINTS.USERS.BY_ID(id));
  }

  /**
   * Actualizar usuario
   */
  async updateUser(id: number, request: UpdateUserRequest): Promise<ApiResponse<User>> {
    return await this.apiClient.put<User>(API_ENDPOINTS.USERS.BY_ID(id), request);
  }

  /**
   * Desactivar usuario (solo admin)
   */
  async deactivateUser(id: number): Promise<ApiResponse<boolean>> {
    return await this.apiClient.post<boolean>(API_ENDPOINTS.USERS.DEACTIVATE(id));
  }

  /**
   * Activar usuario (solo admin)
   */
  async activateUser(id: number): Promise<ApiResponse<boolean>> {
    return await this.apiClient.post<boolean>(API_ENDPOINTS.USERS.ACTIVATE(id));
  }
}