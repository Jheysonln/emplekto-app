export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public errors: string[] = []
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Error de conexión') {
    super(message);
    this.name = 'NetworkError';
  }
}