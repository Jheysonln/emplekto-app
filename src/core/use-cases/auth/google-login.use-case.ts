import { AuthSession, GoogleLoginData } from "@/core/entities/Auth.entity";
import { AuthRepository } from "@/core/repositories/auth.repository";

/**
 * Use Case: Login con Google
 */
export class GoogleLoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: GoogleLoginData): Promise<AuthSession> {
    if (!data.googleToken) {
      throw new Error('Token de Google requerido');
    }

    return await this.authRepository.loginWithGoogle(data);
  }
}
