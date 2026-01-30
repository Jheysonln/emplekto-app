import { AuthRepository } from "@/core/repositories/auth.repository";

/**
 * Use Case: Logout de usuario
 */
export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      throw new Error('Refresh token requerido para logout');
    }

    await this.authRepository.logout(refreshToken);
  }
}