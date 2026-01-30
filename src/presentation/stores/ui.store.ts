import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  // Theme
  theme: Theme;
  
  // Layout
  sidebarCollapsed: boolean;
  
  // Loading states
  globalLoading: boolean;
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
}

/**
 * Store para manejo de estado de UI global
 * ✅ NO persiste nada sensible - solo preferencias de UI
 */
export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      theme: 'system',
      sidebarCollapsed: false,
      globalLoading: false,

      // Actions
      setTheme: (theme) => {
        set({ theme }, false, 'ui/setTheme');
      },

      toggleSidebar: () => {
        set(
          (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
          false,
          'ui/toggleSidebar'
        );
      },

      setSidebarCollapsed: (sidebarCollapsed) => {
        set({ sidebarCollapsed }, false, 'ui/setSidebarCollapsed');
      },

      setGlobalLoading: (globalLoading) => {
        set({ globalLoading }, false, 'ui/setGlobalLoading');
      },
    }),
    { name: 'UIStore' }
  )
);