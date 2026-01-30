import { AuthSession, LoginCredentials } from "@/core/entities/Auth.entity";
import { AuthRepository } from "@/core/repositories/auth.repository";

/**
 * Use Case: Login de usuario
 * Encapsula la lógica de negocio para hacer login
 */
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthSession> {
    // Validaciones de negocio (si las hay)
    if (!credentials.email || !credentials.password) {
      throw new Error('Email y password son requeridos');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Email no válido');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password debe tener al menos 6 caracteres');
    }

    // Delegar a repository
    return await this.authRepository.login(credentials);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}