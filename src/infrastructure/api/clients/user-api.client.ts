import { UpdateUserRequest, UserDto } from "@/shared/types/auth.types";
import { BaseApiClient } from "./base-api.client";
import { PaginationParams, PaginatedResponse } from "@/core/entities";
import { API_ENDPOINTS } from "@/shared/constants/api.constants";
import { ApiResponse } from "@/shared/types/api.types";
import { buildQueryParams } from "@/shared/utils/api.utils";

/**
 * Cliente API para operaciones de usuarios
 */
export class UserApiClient extends BaseApiClient {
  /**
   * Obtener usuario por ID
   */
  async getById(id: number): Promise<ApiResponse<UserDto>> {
    return this.get<UserDto>(API_ENDPOINTS.USERS.BY_ID(id));
  }

  /**
   * Obtener usuarios paginados
   */
  async getAll(params: PaginationParams, roleName?: string): Promise<ApiResponse<PaginatedResponse<UserDto>>> {
    const queryParams = {
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
      roleName,
    };

    const queryString = buildQueryParams(queryParams);
    const url = `${API_ENDPOINTS.USERS.BASE}${queryString}`;

    return this.get<PaginatedResponse<UserDto>>(url);
  }

  /**
   * Actualizar usuario
   */
  async update(id: number, data: UpdateUserRequest): Promise<ApiResponse<UserDto>> {
    return this.put<UserDto>(API_ENDPOINTS.USERS.BY_ID(id), data);
  }

  /**
   * Activar usuario
   */
  async activate(id: number): Promise<ApiResponse<boolean>> {
    return this.post<boolean>(API_ENDPOINTS.USERS.ACTIVATE(id));
  }

  /**
   * Desactivar usuario
   */
  async deactivate(id: number): Promise<ApiResponse<boolean>> {
    return this.post<boolean>(API_ENDPOINTS.USERS.DEACTIVATE(id));
  }
}
