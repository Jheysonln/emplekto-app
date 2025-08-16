// presentation/stores/user.store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, PaginatedResponse } from '../../core/entities';

interface UserFilters {
  search: string;
  roleName: string | null;
}

interface UserState {
  // Data
  users: User[];
  selectedUser: User | null;
  pagination: PaginatedResponse<User> | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
  
  // Actions - Data
  setUsers: (pagination: PaginatedResponse<User>) => void;
  setSelectedUser: (user: User | null) => void;
  updateUser: (user: User) => void;
  removeUser: (userId: number) => void;
  
  // Actions - UI
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<UserFilters>) => void;
  clearFilters: () => void;
  clearError: () => void;
}

const initialFilters: UserFilters = {
  search: '',
  roleName: null,
};

/**
 * Store para manejo de estado de usuarios
 */
export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      // Initial state
      users: [],
      selectedUser: null,
      pagination: null,
      isLoading: false,
      error: null,
      filters: initialFilters,

      // Data actions
      setUsers: (pagination) => {
        set({
          users: pagination.items,
          pagination,
          error: null,
        }, false, 'users/setUsers');
      },

      setSelectedUser: (selectedUser) => {
        set({ selectedUser }, false, 'users/setSelectedUser');
      },

      updateUser: (updatedUser) => {
        const { users, selectedUser } = get();
        
        set({
          users: users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
          ),
          selectedUser: selectedUser?.id === updatedUser.id ? updatedUser : selectedUser,
        }, false, 'users/updateUser');
      },

      removeUser: (userId) => {
        const { users, selectedUser } = get();
        
        set({
          users: users.filter(user => user.id !== userId),
          selectedUser: selectedUser?.id === userId ? null : selectedUser,
        }, false, 'users/removeUser');
      },

      // UI actions
      setLoading: (isLoading) => {
        set({ isLoading }, false, 'users/setLoading');
      },

      setError: (error) => {
        set({ error, isLoading: false }, false, 'users/setError');
      },

      setFilters: (newFilters) => {
        set({
          filters: { ...get().filters, ...newFilters }
        }, false, 'users/setFilters');
      },

      clearFilters: () => {
        set({ filters: initialFilters }, false, 'users/clearFilters');
      },

      clearError: () => {
        set({ error: null }, false, 'users/clearError');
      },
    }),
    { name: 'UserStore' }
  )
);
