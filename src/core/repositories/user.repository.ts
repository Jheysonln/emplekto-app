import { PaginatedResponse, PaginationParams } from "@/shared/types/common.types";
import { UpdateUserData, User } from "../entities/User.entity";

/**
 * Repository interface para operaciones de usuarios
 */
export interface UserRepository {
  // Obtener usuario por ID
  getById(id: number): Promise<User>;
  
  // Obtener todos los usuarios (paginado)
  getAll(params: PaginationParams, roleName?: string): Promise<PaginatedResponse<User>>;
  
  // Actualizar usuario
  update(id: number, data: UpdateUserData): Promise<User>;
  
  // Activar usuario (solo admins)
  activate(id: number): Promise<boolean>;
  
  // Desactivar usuario (solo admins)
  deactivate(id: number): Promise<boolean>;
}