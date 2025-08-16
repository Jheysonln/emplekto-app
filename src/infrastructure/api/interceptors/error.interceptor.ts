import { HttpStatus } from "@/shared/types/api.types";
import { AxiosError, AxiosInstance } from "axios";

/**
 * Interceptor para manejo global de errores HTTP
 */
export class ErrorInterceptor {
  static setup(axiosInstance: AxiosInstance, onUnauthorized?: () => void): void {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const status = error.response?.status;

        switch (status) {
          case HttpStatus.UNAUTHORIZED:
            console.warn('Usuario no autorizado - redirigiendo a login');
            onUnauthorized?.();
            break;

          case HttpStatus.FORBIDDEN:
            console.warn('Acceso prohibido');
            break;

          case HttpStatus.NOT_FOUND:
            console.warn('Recurso no encontrado');
            break;

          case HttpStatus.INTERNAL_SERVER_ERROR:
            console.error('Error interno del servidor');
            break;

          default:
            console.error('Error de API:', error.message);
        }

        return Promise.reject(error);
      }
    );
  }
}
