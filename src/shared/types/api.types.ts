export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  timestamp: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors: string[];
  timestamp: string;
}

export interface ApiRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

// HTTP Status Codes más comunes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}