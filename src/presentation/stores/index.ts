/**
 * Exportaciones centralizadas de todos los stores
 */

import { useAuth, useAuthActions } from './auth.store';
import { useUIStore } from './ui.store';

// Auth store
export { 
  useAuthStore, 
  useAuth, 
  useAuthActions 
} from './auth.store';

export type { AuthState } from './auth.store';

// UI store
export { 
  useUIStore, 
  useTheme, 
  useSidebar, 
  useMobileMenu, 
  useToasts 
} from './ui.store';

export type { UIState, Toast } from './ui.store';

// User store
export { 
  useUserStore, 
  useUsers, 
  useUserActions, 
  useUserFilters 
} from './user.store';

export type { UserState } from './user.store';

// Hook combinado para obtener estado global crítico
export const useGlobalState = () => {
  const auth = useAuth();
  const { theme, globalLoading } = useUIStore();
  
  return {
    ...auth,
    theme,
    globalLoading,
  };
};

// Hook para acciones globales críticas
export const useGlobalActions = () => {
  const authActions = useAuthActions();
  const { setTheme, setGlobalLoading, addToast } = useUIStore();
  
  return {
    ...authActions,
    setTheme,
    setGlobalLoading,
    addToast,
  };
};