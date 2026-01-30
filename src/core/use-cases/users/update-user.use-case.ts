import { UpdateUserData, User } from "@/core/entities/User.entity";
import { UserRepository } from "@/core/repositories/user.repository";

/**
 * Use Case: Actualizar usuario
 */
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number, data: UpdateUserData): Promise<User> {
    // Validaciones
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    this.validateUpdateData(data);

    return await this.userRepository.update(id, data);
  }

  private validateUpdateData(data: UpdateUserData): void {
    if (!data.firstName?.trim()) {
      throw new Error('Nombre es requerido');
    }

    if (!data.lastName?.trim()) {
      throw new Error('Apellido es requerido');
    }

    if (data.firstName.length > 100) {
      throw new Error('Nombre no puede tener más de 100 caracteres');
    }

    if (data.lastName.length > 100) {
      throw new Error('Apellido no puede tener más de 100 caracteres');
    }

    if (data.phoneNumber && data.phoneNumber.length > 20) {
      throw new Error('Teléfono no puede tener más de 20 caracteres');
    }
  }
}
