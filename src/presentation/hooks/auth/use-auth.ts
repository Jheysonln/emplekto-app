import { useCallback } from 'react';
import { useAuthStore, useAuthActions } from '@/presentation/stores/auth.store';
import { useToasts } from '@/presentation/stores//ui.store';
import { authApi } from '@/infrastructure/config/api.config';
import { 
  LoginRequest, 
  GoogleLoginRequest, 
  RegisterRequest,
  AuthResponse 
} from '@/shared/types/auth.types';
import { ApiError } from '@/shared/errors/api.error';
import { AUTH_ERRORS } from '@/shared/constants/auth.constants';

/**
 * Hook principal para manejo de autenticación
 */
export const useAuth = () => {
  const authState = useAuthStore();
  const authActions = useAuthActions();
  const { addToast } = useToasts();

  /**
   * Login tradicional con email/password
   */
  const login = useCallback(async (credentials: LoginRequest): Promise<boolean> => {
    try {
      authActions.setLoading(true);
      authActions.setError(null);

      const response = await authApi.login(credentials);

      if (response.success && response.data) {
        authActions.setAuth(response.data);
        
        addToast({
          type: 'success',
          message: `¡Bienvenido ${response.data.user.firstName}!`,
        });

        return true;
      } else {
        throw new ApiError(response.message, 400, response.errors);
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : AUTH_ERRORS.UNKNOWN_ERROR;

      authActions.setError(errorMessage);
      
      addToast({
        type: 'error',
        title: 'Error de inicio de sesión',
        message: errorMessage,
      });

      return false;
    } finally {
      authActions.setLoading(false);
    }
  }, [authActions, addToast]);

  /**
   * Login con Google OAuth
   */
  const loginWithGoogle = useCallback(async (googleToken: string, rememberMe = false): Promise<boolean> => {
    try {
      authActions.setLoading(true);
      authActions.setError(null);

      const request: GoogleLoginRequest = { googleToken, rememberMe };
      const response = await authApi.loginWithGoogle(request);

      if (response.success && response.data) {
        authActions.setAuth(response.data);
        
        addToast({
          type: 'success',
          message: `¡Bienvenido ${response.data.user.firstName}!`,
        });

        return true;
      } else {
        throw new ApiError(response.message, 400, response.errors);
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Error al iniciar sesión con Google';

      authActions.setError(errorMessage);
      
      addToast({
        type: 'error',
        title: 'Error de Google',
        message: errorMessage,
      });

      return false;
    } finally {
      authActions.setLoading(false);
    }
  }, [authActions, addToast]);

  /**
   * Registro de nuevo usuario
   */
  const register = useCallback(async (userData: RegisterRequest): Promise<boolean> => {
    try {
      authActions.setLoading(true);
      authActions.setError(null);

      const response = await authApi.register(userData);

      if (response.success && response.data) {
        authActions.setAuth(response.data);
        
        addToast({
          type: 'success',
          title: 'Cuenta creada',
          message: `¡Bienvenido ${response.data.user.firstName}! Tu cuenta ha sido creada exitosamente.`,
          duration: 6000,
        });

        return true;
      } else {
        throw new ApiError(response.message, 400, response.errors);
      }
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Error al crear la cuenta';

      authActions.setError(errorMessage);
      
      addToast({
        type: 'error',
        title: 'Error de registro',
        message: errorMessage,
      });

      return false;
    } finally {
      authActions.setLoading(false);
    }
  }, [authActions, addToast]);

  /**
   * Logout del usuario
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      authActions.setLoading(true);
      
      // Intentar logout en el servidor
      await authApi.logout();
      
      addToast({
        type: 'info',
        message: 'Sesión cerrada correctamente',
      });
    } catch (error) {
      // Aunque falle el logout del servidor, limpiamos el estado local
      console.warn('Error during server logout:', error);
    } finally {
      // Siempre limpiar el estado local
      authActions.logout();
      authActions.setLoading(false);
    }
  }, [authActions, addToast]);

  /**
   * Refrescar token de acceso
   */
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const response = await authApi.refreshToken();

      if (response.success && response.data) {
        authActions.setAuth(response.data);
        return true;
      }

      return false;
    } catch (error) {
      console.warn('Token refresh failed:', error);
      authActions.clearAuth();
      return false;
    }
  }, [authActions]);

  /**
   * Verificar si el usuario tiene un rol específico
   */
  const hasRole = useCallback((requiredRole: string): boolean => {
    return authState.user?.roleName === requiredRole;
  }, [authState.user]);

  /**
   * Verificar si el usuario tiene alguno de los roles especificados
   */
  const hasAnyRole = useCallback((roles: string[]): boolean => {
    return authState.user ? roles.includes(authState.user.roleName) : false;
  }, [authState.user]);

  return {
    // Estado
    ...authState,
    
    // Acciones
    login,
    loginWithGoogle,
    register,
    logout,
    refreshToken,
    
    // Utilidades
    hasRole,
    hasAnyRole,
  };
};
