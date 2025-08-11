export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: string[]
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class TokenExpiredError extends AuthError {
  constructor() {
    super('Token expirado', 401);
    this.name = 'TokenExpiredError';
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Credenciales inválidas', 401);
    this.name = 'InvalidCredentialsError';
  }
}