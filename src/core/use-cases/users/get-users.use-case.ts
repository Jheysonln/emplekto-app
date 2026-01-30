import { User } from "@/core/entities/User.entity";
import { UserRepository } from "@/core/repositories/user.repository";
import { PaginatedResponse, PaginationParams } from "@/shared/types/common.types";

/**
 * Use Case: Obtener lista de usuarios
 */
export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    params: PaginationParams, 
    roleName?: string
  ): Promise<PaginatedResponse<User>> {
    // Validaciones básicas
    if (params.page < 1) {
      throw new Error('Página debe ser mayor a 0');
    }

    if (params.pageSize < 1 || params.pageSize > 100) {
      throw new Error('Tamaño de página debe estar entre 1 y 100');
    }

    return await this.userRepository.getAll(params, roleName);
  }
}