import { API_CONFIG, CONTENT_TYPES, HTTP_HEADERS } from '@/shared/constants/api.constants';
import { ApiResponse } from '@/shared/types/api.types';
import { getErrorMessage } from '@/shared/utils/api.utils';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * Cliente base para todas las llamadas a la API
 * Configuración centralizada de Axios
 */
export class BaseApiClient {
  protected readonly axios: AxiosInstance;

  constructor(baseURL?: string) {
    this.axios = axios.create({
      baseURL: baseURL || API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
        [HTTP_HEADERS.ACCEPT]: CONTENT_TYPES.JSON,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - agregar auth token
    this.axios.interceptors.request.use(
      (config) => {
        // El token se agregará en el auth interceptor específico
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - manejo global de errores
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Log del error para debugging
        console.error('API Error:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
        });

        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST request
   */
  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PUT request
   */
  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE request
   */
  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: any): Error {
    const message = getErrorMessage(error);
    return new Error(message);
  }

  /**
   * Configurar header de autorización
   */
  public setAuthToken(token: string): void {
    this.axios.defaults.headers.common[HTTP_HEADERS.AUTHORIZATION] = `Bearer ${token}`;
  }

  /**
   * Remover header de autorización
   */
  public clearAuthToken(): void {
    delete this.axios.defaults.headers.common[HTTP_HEADERS.AUTHORIZATION];
  }
}
