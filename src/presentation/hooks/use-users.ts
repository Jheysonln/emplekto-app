import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '../stores/user.store';
import { useApi } from './use-api';
import { QUERY_KEYS, DEFAULT_PAGINATION } from '../../shared/constants/app.constants';
import { getErrorMessage } from '../../shared/utils/api.utils';
import type { UpdateUserFormData } from '../validators/user.schemas';
import type { PaginationParams } from '../../core/entities';

// Import use cases
import { GetUsersUseCase, GetUserUseCase, UpdateUserUseCase, ActivateUserUseCase, DeactivateUserUseCase } from '../../core/use-cases';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserApiClient } from '../../infrastructure/api/clients/user-api.client';

// Setup temporal de dependencias
const userApiClient = new UserApiClient();
const userRepository = new UserRepositoryImpl(userApiClient);

/**
 * Hook para operaciones de usuarios
 */
export const useUsers = (params: PaginationParams = DEFAULT_PAGINATION, roleName?: string) => {
    const {
        users,
        selectedUser,
        pagination,
        isLoading,
        error,
        filters,
        setUsers,
        setSelectedUser,
        updateUser,
        setLoading,
        setError,
        clearError,
    } = useUserStore();

    const { handleError, handleSuccess } = useApi();
    const queryClient = useQueryClient();

    // Query para obtener usuarios
    const usersQuery = useQuery({
        queryKey: QUERY_KEYS.USERS_PAGINATED({ ...params, ...filters }),
        queryFn: async () => {
            const getUsersUseCase = new GetUsersUseCase(userRepository);
            return await getUsersUseCase.execute(params, roleName);
        },
        meta: {
            onSuccess: (data: any) => {
                setUsers(data);
                clearError();
            },
            onError: (error: any) => {
                setError(getErrorMessage(error));
            },
        },
    });

    // Query para obtener usuario específico
    const useUser = (id: number) => {
        return useQuery({
            queryKey: QUERY_KEYS.USER(id),
            queryFn: async () => {
                const getUserUseCase = new GetUserUseCase(userRepository);
                return await getUserUseCase.execute(id);
            },
            enabled: !!id,
            meta: {
                onSuccess: (user: any) => {
                    setSelectedUser(user);
                },
            },
        });
    };

    // Mutation para actualizar usuario
    const updateUserMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateUserFormData }) => {
            const updateUserUseCase = new UpdateUserUseCase(userRepository);
            return await updateUserUseCase.execute(id, data);
        },
        onSuccess: (updatedUser) => {
            updateUser(updatedUser);
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER(updatedUser.id) });
            handleSuccess('Usuario actualizado exitosamente');
        },
        onError: handleError,
    });

    // Mutation para activar usuario
    const activateUserMutation = useMutation({
        mutationFn: async (id: number) => {
            const activateUserUseCase = new ActivateUserUseCase(userRepository);
            return await activateUserUseCase.execute(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
            handleSuccess('Usuario activado exitosamente');
        },
        onError: handleError,
    });

    // Mutation para desactivar usuario
    const deactivateUserMutation = useMutation({
        mutationFn: async (id: number) => {
            const deactivateUserUseCase = new DeactivateUserUseCase(userRepository);
            return await deactivateUserUseCase.execute(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
            handleSuccess('Usuario desactivado exitosamente');
        },
        onError: handleError,
    });

    return {
        // Data
        users,
        selectedUser,
        pagination,

        // State
        isLoading: isLoading || usersQuery.isLoading,
        error,

        // Actions
        updateUser: updateUserMutation.mutate,
        activateUser: activateUserMutation.mutate,
        deactivateUser: deactivateUserMutation.mutate,
        setSelectedUser,
        clearError,

        // Query utilities
        useUser,
        refetch: usersQuery.refetch,

        // Mutation states
        isUpdating: updateUserMutation.isPending,
        isActivating: activateUserMutation.isPending,
        isDeactivating: deactivateUserMutation.isPending,
    };
};