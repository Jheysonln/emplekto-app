import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiError } from '@/shared/types/api.types';
import { HTTP_STATUS } from '@/shared//constants/api.constants';

/**
 * Cliente HTTP base con interceptors y manejo de errores
 */
export class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Para cookies de refresh token
        });

        this.setupInterceptors();
    }

    /**
     * Configurar interceptors para request y response
     */
    private setupInterceptors(): void {
        // Request interceptor - añadir token de autorización
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // Obtener token del storage (se implementará en auth interceptor)
                const token = this.getAuthToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Log de request en desarrollo
                if (process.env.NODE_ENV === 'development') {
                    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
                        headers: config.headers,
                        data: config.data,
                    });
                }

                return config;
            },
            (error) => {
                console.error('❌ Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor - manejo de errores globales
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Log de response en desarrollo
                if (process.env.NODE_ENV === 'development') {
                    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                        status: response.status,
                        data: response.data,
                    });
                }

                return response;
            },
            async (error) => {
                const originalRequest = error.config;

                // Log de error
                console.error(`❌ API Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });

                // Manejo de token expirado (401)
                if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // Intentar refrescar el token
                        await this.refreshToken();

                        // Reintentar la request original con el nuevo token
                        const newToken = this.getAuthToken();
                        if (newToken) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return this.axiosInstance(originalRequest);
                        }
                    } catch (refreshError) {
                        // Si falla el refresh, redirigir a login
                        this.handleAuthFailure();
                        return Promise.reject(refreshError);
                    }
                }

                // Transformar error a formato estándar
                const apiError = this.transformError(error);
                return Promise.reject(apiError);
            }
        );
    }

    /**
     * Obtener token de autorización del storage
     */
    private getAuthToken(): string | null {
        try {
            return localStorage.getItem('auth-token');
        } catch {
            return null;
        }
    }

    /**
     * Refrescar token de autorización
     */
    private async refreshToken(): Promise<void> {
        try {
            const response = await axios.post(`${this.axiosInstance.defaults.baseURL}/auth/refresh`, {}, {
                withCredentials: true, // Para enviar refresh token cookie
            });

            if (response.data?.success && response.data?.data?.accessToken) {
                // Guardar nuevo token
                localStorage.setItem('auth-token', response.data.data.accessToken);

                // Dispatch evento para actualizar stores
                window.dispatchEvent(new CustomEvent('token-refreshed', {
                    detail: response.data.data
                }));
            }
        } catch (error) {
            // Limpiar tokens inválidos
            localStorage.removeItem('auth-token');
            throw error;
        }
    }

    /**
     * Manejar fallo de autenticación
     */
    private handleAuthFailure(): void {
        // Limpiar storage
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');

        // Dispatch evento de logout
        window.dispatchEvent(new CustomEvent('auth-failure'));

        // Redirigir a login (solo si no estamos ya ahí)
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            window.location.href = '/login';
        }
    }

    /**
     * Transformar error de axios a ApiError
     */
    private transformError(error: any): ApiError {
        if (error.code === 'ECONNABORTED') {
            return { message: 'Timeout de conexión', statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR };
        }

        if (!error.response) {
            return { message: 'Error de red', statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR };
        }

        const { status, data } = error.response;
        const message = data?.message || 'Error desconocido';
        const errors = data?.errors || [];

        return { message, statusCode: status, errors };
    }


    /**
     * Método GET genérico
     */
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.get(url, config);
        return response.data;
    }

    /**
     * Método POST genérico
     */
    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.post(url, data, config);
        return response.data;
    }

    /**
     * Método PUT genérico
     */
    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.put(url, data, config);
        return response.data;
    }

    /**
     * Método DELETE genérico
     */
    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.delete(url, config);
        return response.data;
    }

    /**
     * Método PATCH genérico
     */
    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.patch(url, data, config);
        return response.data;
    }
}