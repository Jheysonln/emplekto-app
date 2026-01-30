import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { storage } from '../../../shared/utils/storage';
import { STORAGE_KEYS } from '../../../shared/constants/app.constants';
import { HTTP_HEADERS } from '../../../shared/constants/api.constants';

/**
 * Interceptor para inyectar automáticamente el token de auth
 */
export class AuthInterceptor {
  static setup(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Obtener token del storage
        const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
        
        if (token) {
          // Asegurar que headers existe
          if (!config.headers) {
            config.headers = {} as any;
          }
          config.headers[HTTP_HEADERS.AUTHORIZATION] = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
