
// Import ENV_CONFIG
import { ENV_CONFIG } from '../config/env.config';
import { ApiError, ApiResponse } from '../types/api.types';

// Type guards
export const isApiError = (response: any): response is ApiError => {
  return response && response.success === false;
};

export const isApiSuccess = <T>(response: any): response is ApiResponse<T> => {
  return response && response.success === true;
};

// HTTP Status helpers
export const isHttpSuccess = (status: number): boolean => {
  return status >= 200 && status < 300;
};

export const isHttpClientError = (status: number): boolean => {
  return status >= 400 && status < 500;
};

export const isHttpServerError = (status: number): boolean => {
  return status >= 500;
};

// Error message extractor
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    // API Error response
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    // Axios error
    if ('response' in error && error.response && typeof error.response === 'object') {
      const response = error.response as any;
      
      if (response.data?.message) {
        return response.data.message;
      }
      
      if (response.statusText) {
        return response.statusText;
      }
    }

    // Generic error object
    if ('message' in error) {
      return String(error.message);
    }
  }

  return 'Ha ocurrido un error inesperado';
};

// URL builders
export const buildApiUrl = (endpoint: string, baseUrl?: string): string => {
  const base = baseUrl || ENV_CONFIG.apiUrl;
  
  // Remove trailing slash from base and leading slash from endpoint
  const cleanBase = base.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  
  return `${cleanBase}/${cleanEndpoint}`;
};

export const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Token helpers
export const extractTokenFromHeader = (authHeader: string): string | null => {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
};

export const createAuthHeader = (token: string): string => {
  return `Bearer ${token}`;
};

// Date helpers para APIs
export const toISOString = (date: Date): string => {
  return date.toISOString();
};

export const fromISOString = (isoString: string): Date => {
  return new Date(isoString);
};

// Delay helper para retry logic
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

