// presentation/hooks/use-auth.ts
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth.store';
import { useApi } from './use-api';
import { getErrorMessage } from '../../shared/utils/api.utils';
import type { LoginFormData, RegisterFormData, GoogleLoginFormData } from '../validators/auth.schemas';

// Import use cases y repository impl
import { LoginUseCase, LogoutUseCase, RegisterUseCase, GoogleLoginUseCase } from '../../core/use-cases';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repository.impl';
import { AuthApiClient } from '../../infrastructure/api/clients/auth-api.client';

// Setup temporal de dependencias (DI container vendrá después)
const authApiClient = new AuthApiClient();
const authRepository = new AuthRepositoryImpl(authApiClient);

/**
 * Hook principal para operaciones de autenticación
 * ✅ Manejo correcto de tokens en memoria
 */
export const useAuth = () => {
  const { 
    user, 
    accessToken,
    isAuthenticated, 
    isLoading, 
    error,
    setSession,
    setLoading,
    setError,
    logout: logoutStore,
    clearError
  } = useAuthStore();
  
  const { handleError, handleSuccess } = useApi();

  // Configurar token en API client cuando cambie
  if (accessToken) {
    authApiClient.setAuthToken(accessToken);
  } else {
    authApiClient.clearAuthToken();
  }

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const loginUseCase = new LoginUseCase(authRepository);
      return await loginUseCase.execute(data);
    },
    onMutate: () => {
      setLoading(true);
      clearError();
    },
    onSuccess: (session) => {
      setSession(session);
      handleSuccess('¡Bienvenido!');
    },
    onError: (error) => {
      setError(getErrorMessage(error));
      handleError(error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const registerUseCase = new RegisterUseCase(authRepository);
      return await registerUseCase.execute(data);
    },
    onMutate: () => {
      setLoading(true);
      clearError();
    },
    onSuccess: (session) => {
      setSession(session);
      handleSuccess('¡Cuenta creada exitosamente!');
    },
    onError: (error) => {
      setError(getErrorMessage(error));
      handleError(error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Google login mutation
  const googleLoginMutation = useMutation({
    mutationFn: async (data: GoogleLoginFormData) => {
      const googleLoginUseCase = new GoogleLoginUseCase(authRepository);
      return await googleLoginUseCase.execute(data);
    },
    onMutate: () => {
      setLoading(true);
      clearError();
    },
    onSuccess: (session) => {
      setSession(session);
      handleSuccess('¡Bienvenido!');
    },
    onError: (error) => {
      setError(getErrorMessage(error));
      handleError(error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const logoutUseCase = new LogoutUseCase(authRepository);
      // El refresh token viene de HttpOnly cookie manejada por el backend
      await logoutUseCase.execute(''); // Backend maneja el token de la cookie
    },
    onSuccess: () => {
      logoutStore();
      handleSuccess('Sesión cerrada');
    },
    onError: (error) => {
      // Siempre hacer logout local aunque falle el backend
      logoutStore();
      console.error('Error en logout:', error);
    },
  });

  return {
    // State
    user,
    accessToken,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    error,

    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    loginWithGoogle: googleLoginMutation.mutate,
    logout: logoutMutation.mutate,
    clearError,

    // Mutation states
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
    isGoogleLoginPending: googleLoginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
  };
};