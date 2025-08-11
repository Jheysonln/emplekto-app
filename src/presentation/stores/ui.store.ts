import { create } from 'zustand';

export interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Navigation
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  
  // Loading states
  globalLoading: boolean;
  
  // Modals y dialogs
  modals: Record<string, boolean>;
  
  // Toast notifications
  toasts: Toast[];
  
  // Acciones
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  addToast: (toast: Omit<Toast, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  timestamp: number;
}

/**
 * Store de UI para estado de interfaz global
 */
export const useUIStore = create<UIState>((set, get) => ({
  // Estado inicial
  theme: 'system',
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  globalLoading: false,
  modals: {},
  toasts: [],

  // Theme actions
  setTheme: (theme) => {
    set({ theme });
    
    // Aplicar tema inmediatamente al DOM
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        root.classList.remove('dark');
      } else {
        // System theme
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
      
      // Guardar preferencia
      localStorage.setItem('theme-preference', theme);
    }
  },

  // Sidebar actions
  toggleSidebar: () => {
    const { sidebarCollapsed } = get();
    set({ sidebarCollapsed: !sidebarCollapsed });
  },

  setSidebarCollapsed: (collapsed) => {
    set({ sidebarCollapsed: collapsed });
  },

  // Mobile menu actions
  toggleMobileMenu: () => {
    const { mobileMenuOpen } = get();
    set({ mobileMenuOpen: !mobileMenuOpen });
  },

  setMobileMenuOpen: (open) => {
    set({ mobileMenuOpen: open });
  },

  // Global loading
  setGlobalLoading: (loading) => {
    set({ globalLoading: loading });
  },

  // Modal actions
  openModal: (modalId) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: true }
    }));
  },

  closeModal: (modalId) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: false }
    }));
  },

  toggleModal: (modalId) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: !state.modals[modalId] }
    }));
  },

  // Toast actions
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = {
      ...toast,
      id,
      timestamp: Date.now(),
      duration: toast.duration || 5000,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast]
    }));

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, newToast.duration);
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));

// Selectores para UI
export const useTheme = () => {
  const { theme, setTheme } = useUIStore();
  return { theme, setTheme };
};

export const useSidebar = () => {
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUIStore();
  return { sidebarCollapsed, toggleSidebar, setSidebarCollapsed };
};

export const useMobileMenu = () => {
  const { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  return { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen };
};

export const useToasts = () => {
  const { toasts, addToast, removeToast, clearToasts } = useUIStore();
  return { toasts, addToast, removeToast, clearToasts };
};