import { create } from 'zustand';
import { User, UserRole } from '@/shared/types/auth.types';
import { PaginatedResponse } from '@/shared/types/api.types';

export interface UserState {
  // Estado
  users: User[];
  currentUser: User | null;
  totalUsers: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  
  // Filtros
  roleFilter: UserRole | null;
  searchQuery: string;

  // Acciones
  setUsers: (paginatedResponse: PaginatedResponse<User>) => void;
  setCurrentUser: (user: User | null) => void;
  updateUserInList: (user: User) => void;
  removeUserFromList: (userId: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setRoleFilter: (role: UserRole | null) => void;
  setSearchQuery: (query: string) => void;
  clearUsers: () => void;
}

/**
 * Store para manejo de usuarios (admin/moderator)
 */
export const useUserStore = create<UserState>((set, get) => ({
  // Estado inicial
  users: [],
  currentUser: null,
  totalUsers: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  isLoading: false,
  error: null,
  roleFilter: null,
  searchQuery: '',

  // Establecer lista de usuarios paginada
  setUsers: (paginatedResponse: PaginatedResponse<User>) => {
    set({
      users: paginatedResponse.items,
      totalUsers: paginatedResponse.totalItems,
      currentPage: paginatedResponse.currentPage,
      pageSize: paginatedResponse.pageSize,
      totalPages: paginatedResponse.totalPages,
      error: null,
      isLoading: false,
    });
  },

  // Establecer usuario actual (para vista detalle)
  setCurrentUser: (user: User | null) => {
    set({ currentUser: user, error: null });
  },

  // Actualizar usuario en la lista
  updateUserInList: (updatedUser: User) => {
    set((state) => ({
      users: state.users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ),
      currentUser: state.currentUser?.id === updatedUser.id ? updatedUser : state.currentUser,
    }));
  },

  // Remover usuario de la lista
  removeUserFromList: (userId: number) => {
    set((state) => ({
      users: state.users.filter(user => user.id !== userId),
      totalUsers: state.totalUsers - 1,
      currentUser: state.currentUser?.id === userId ? null : state.currentUser,
    }));
  },

  // Estados de carga y error
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error, isLoading: false });
  },

  // Paginación
  setPage: (page: number) => {
    set({ currentPage: page });
  },

  setPageSize: (pageSize: number) => {
    set({ pageSize, currentPage: 1 }); // Reset to first page when changing page size
  },

  // Filtros
  setRoleFilter: (role: UserRole | null) => {
    set({ roleFilter: role, currentPage: 1 }); // Reset to first page when filtering
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query, currentPage: 1 }); // Reset to first page when searching
  },

  // Limpiar estado
  clearUsers: () => {
    set({
      users: [],
      currentUser: null,
      totalUsers: 0,
      currentPage: 1,
      totalPages: 0,
      error: null,
      isLoading: false,
      roleFilter: null,
      searchQuery: '',
    });
  },
}));

// Selectores para uso común
export const useUsers = () => {
  const { users, totalUsers, currentPage, pageSize, totalPages, isLoading, error } = useUserStore();
  return { users, totalUsers, currentPage, pageSize, totalPages, isLoading, error };
};

export const useUserActions = () => {
  const { 
    setUsers, 
    setCurrentUser, 
    updateUserInList, 
    removeUserFromList, 
    setLoading, 
    setError, 
    setPage, 
    setPageSize, 
    setRoleFilter, 
    setSearchQuery, 
    clearUsers 
  } = useUserStore();
  
  return { 
    setUsers, 
    setCurrentUser, 
    updateUserInList, 
    removeUserFromList, 
    setLoading, 
    setError, 
    setPage, 
    setPageSize, 
    setRoleFilter, 
    setSearchQuery, 
    clearUsers 
  };
};

export const useUserFilters = () => {
  const { roleFilter, searchQuery, setRoleFilter, setSearchQuery } = useUserStore();
  return { roleFilter, searchQuery, setRoleFilter, setSearchQuery };
};