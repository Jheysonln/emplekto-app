// presentation/components/index.ts - Barrel exports
// UI Components
export { Button } from './ui/button';
export { Input } from './ui/input';
export { Form, FormField, FormError } from './ui/form';
export { ToastProvider } from './ui/toast';

// Layouts
export { AuthLayout } from './layouts/auth-layout';
export { MainLayout } from './layouts/main-layout';

// Features
export { LoginForm } from './features/auth/login-form';
export { LogoutButton } from './features/auth/logout-button';
export { DashboardStats } from './features/dashboard/dashboard-stats';
export { UsersTable } from './features/users/users-table';
export { UserForm } from './features/users/user-form';

// Guards
export { AuthGuard, useAuthGuard } from '../guards/auth-guard';

// Providers
export { AppProvider } from '../providers/app.provider';
export { ReactQueryProvider } from '../providers/react-query.provider';
export { AuthProvider, useAuthContext } from '../providers/auth.provider';