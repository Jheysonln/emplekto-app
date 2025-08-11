import { useCallback, useEffect } from 'react';
import { useUserStore, useUserActions, useUserFilters } from '@/presentation/stores/user.store';
import { useToast } from '@/presentation/hooks/common/use-toast';
import { userApi } from '@/infrastructure/config/api.config';
import { UserRole } from '@/shared/types/auth.types';
import { ApiError } from '@/shared/errors/api.error';
import { UpdateUserRequest } from '@/infrastructure/http-clients/dotnet-apis/user-api.client';

/**
 * Hook para manejo de usuarios (lista, CRUD, etc.)
 */
export const useUsers = () => {
  const userState = useUserStore();
  const userActions = useUserActions();
  const filters = useUserFilters();
  const { success, error } = useToast();

  /**
   * Cargar lista de usuarios con paginación y filtros
   */
  const fetchUsers = useCallback(async (
    page?: number,
    pageSize?: number,
    role?: UserRole | null
  ) => {
    try {
      userActions.setLoading(true);
      
      const currentPage = page ?? userState.currentPage;
      const currentPageSize = pageSize ?? userState.pageSize;
      const currentRole = role !== undefined ? role : filters.roleFilter;

      const response = await userApi.getUsers(currentPage, currentPageSize, currentRole || undefined);

      if (response.success && response.data) {
        userActions.setUsers(response.data);
      } else {
        throw new ApiError(response.message, 400, response.errors);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Error al cargar usuarios';
      
      userActions.setError(errorMessage);
      error(errorMessage);
    }
  }, [userState.currentPage, userState.pageSize, filters.roleFilter, userActions, error]);

  /**
   * Obtener usuario por ID
   */
  const fetchUserById = useCallback(async (id: number) => {
    try {
      userActions.setLoading(true);
      
      const response = await userApi.getUserById(id);

      if (response.success && response.data) {
        userActions.setCurrentUser(response.data);
        return response.data;
      } else {
        throw new ApiError(response.message, 400, response.errors);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Error al cargar usuario';
      
      userActions.setError(errorMessage);
      error(errorMessage);
      return null;
    } finally {
      userActions.setLoading(false);
    }
  }, [userActions, error]);

  /**
   * Actualizar usuario
   */
  const updateUser = useCallback(async (id: number, updates: UpdateUserRequest) => {
    try {
      userActions.setLoading(true);
      
      const response = await userApi.updateUser(id, updates);

      if (response.success && response.data) {
        userActions.updateUserInList(response.data);
        success('Usuario actualizado correctamente');
        return response.data;
      } else {
        throw new ApiError(response.message, 400, response.errors);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Error al actualizar usuario';
      
      userActions.setError(errorMessage);
      error(errorMessage);
      return null;
    } finally {
      userActions.setLoading(false);
    }
  }, [userActions, success, error]);

  /**
   * Desactivar usuario
   */
  const deactivateUser = useCallback(async (id: number) => {
    try {
      userActions.setLoading(true);
      
      const response = await userApi.deactivateUser(id);

      if (response.success) {
        // Actualizar usuario en la lista marcándolo como inactivo
        const user = userState.users.find(u => u.id === id);
        if (user) {
          userActions.updateUserInList({ ...user, isActive: false });
        }
        
        success('Usuario desactivado correctamente');
        return true;
      } else {
        throw new ApiError(response.message, 400, response.errors);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Error al desactivar usuario';
      
      userActions.setError(errorMessage);
      error(errorMessage);
      return false;
    } finally {
      userActions.setLoading(false);
    }
  }, [userState.users, userActions, success, error]);

  /**
   * Activar usuario
   */
  const activateUser = useCallback(async (id: number) => {
    try {
      userActions.setLoading(true);
      
      const response = await userApi.activateUser(id);

      if (response.success) {
        // Actualizar usuario en la lista marcándolo como activo
        const user = userState.users.find(u => u.id === id);
        if (user) {
          userActions.updateUserInList({ ...user, isActive: true });
        }
        
        success('Usuario activado correctamente');
        return true;
      } else {
        throw new ApiError(response.message, 400, response.errors);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Error al activar usuario';
      
      userActions.setError(errorMessage);
      error(errorMessage);
      return false;
    } finally {
      userActions.setLoading(false);
    }
  }, [userState.users, userActions, success, error]);

  /**
   * Cambiar página
   */
  const goToPage = useCallback((page: number) => {
    userActions.setPage(page);
    fetchUsers(page);
  }, [userActions, fetchUsers]);

  /**
   * Cambiar tamaño de página
   */
  const changePageSize = useCallback((size: number) => {
    userActions.setPageSize(size);
    fetchUsers(1, size);
  }, [userActions, fetchUsers]);

  /**
   * Aplicar filtro de rol
   */
  const filterByRole = useCallback((role: UserRole | null) => {
    userActions.setRoleFilter(role);
    fetchUsers(1, undefined, role);
  }, [userActions, fetchUsers]);

  /**
   * Buscar usuarios (implementar en el futuro si es necesario)
   */
  const searchUsers = useCallback((query: string) => {
    userActions.setSearchQuery(query);
    // TODO: Implementar búsqueda en API
  }, [userActions]);

  /**
   * Refrescar lista actual
   */
  const refresh = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    // Estado
    ...userState,
    ...filters,
    
    // Acciones principales
    fetchUsers,
    fetchUserById,
    updateUser,
    deactivateUser,
    activateUser,
    
    // Navegación y filtros
    goToPage,
    changePageSize,
    filterByRole,
    searchUsers,
    refresh,
    
    // Utilidades
    canEdit: (userId: number) => {
      // Solo puede editar si es admin o el mismo usuario
      // Esta lógica se puede expandir según necesidades
      return true;
    },
    
    canDeactivate: (userId: number) => {
      // Solo admin puede desactivar usuarios
      return true;
    },
  };
};