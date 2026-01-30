import { User } from "@/core/entities/User.entity";
import { UserRepository } from "@/core/repositories/user.repository";

/**
 * Use Case: Obtener usuario por ID
 */
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    return await this.userRepository.getById(id);
  }
}
