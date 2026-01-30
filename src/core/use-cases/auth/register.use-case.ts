import { AuthSession } from "@/core/entities/Auth.entity";
import { CreateUserData } from "@/core/entities/User.entity";
import { AuthRepository } from "@/core/repositories/auth.repository";

/**
 * Use Case: Registro de nuevo usuario
 */
export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: CreateUserData): Promise<AuthSession> {
    // Validaciones de negocio
    this.validateUserData(userData);

    // Delegar a repository
    return await this.authRepository.register(userData);
  }

  private validateUserData(userData: CreateUserData): void {
    if (!userData.email || !userData.password) {
      throw new Error('Email y password son requeridos');
    }

    if (!userData.firstName || !userData.lastName) {
      throw new Error('Nombre y apellido son requeridos');
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error('Email no válido');
    }

    if (userData.password.length < 6) {
      throw new Error('Password debe tener al menos 6 caracteres');
    }

    if (!userData.roleName) {
      throw new Error('Rol es requerido');
    }

    // Validar roles permitidos para registro
    const allowedRoles = ['JobSeeker', 'Employer'];
    if (!allowedRoles.includes(userData.roleName)) {
      throw new Error('Rol no válido para registro');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}