import { AuthSession, RefreshTokenData } from "@/core/entities/Auth.entity";
import { AuthRepository } from "@/core/repositories/auth.repository";

/**
 * Use Case: Renovar token de acceso
 */
export class RefreshTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: RefreshTokenData): Promise<AuthSession> {
    if (!data.refreshToken) {
      throw new Error('Refresh token requerido');
    }

    return await this.authRepository.refreshToken(data);
  }
}