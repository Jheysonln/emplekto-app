import { UserRepository } from "@/core/repositories/user.repository";

/**
 * Use Case: Activar usuario (solo admins)
 */
export class ActivateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<boolean> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    return await this.userRepository.activate(id);
  }
}