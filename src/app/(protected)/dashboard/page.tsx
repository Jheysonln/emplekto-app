'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Button } from '@/presentation/components/ui/button';
import { 
  Users, 
  Briefcase, 
  Building2, 
  TrendingUp,
  Plus,
  Search,
  Bell,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/presentation/hooks/auth/use-auth';
import { UserRole } from '@/shared/types/auth.types';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes.constants';

/**
 * Página principal del dashboard
 */
export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const isJobSeeker = user.role === UserRole.JobSeeker;
  const isEmployer = user.role === UserRole.Employer;
  const isAdmin = user.role === UserRole.Admin || user.role === UserRole.Moderator;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            ¡Hola, {user.firstName}! 👋
          </h1>
          <p className="text-muted-foreground">
            {isJobSeeker && 'Encuentra tu próxima oportunidad profesional'}
            {isEmployer && 'Gestiona tus ofertas y encuentra el talento ideal'}
            {isAdmin && 'Panel de administración del sistema'}
          </p>
        </div>
        
        <div className="flex gap-2">
          {isJobSeeker && (
            <Button asChild>
              <Link href={ROUTES.JOBS}>
                <Search className="h-4 w-4 mr-2" />
                Buscar empleos
              </Link>
            </Button>
          )}
          
          {isEmployer && (
            <Button asChild>
              <Link href="/jobs/post">
                <Plus className="h-4 w-4 mr-2" />
                Publicar oferta
              </Link>
            </Button>
          )}
          
          {isAdmin && (
            <Button asChild>
              <Link href={ROUTES.USERS}>
                <Users className="h-4 w-4 mr-2" />
                Gestionar usuarios
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isJobSeeker && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Aplicaciones enviadas
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde la semana pasada
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Entrevistas programadas
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  2 esta semana
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {isEmployer && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ofertas activas
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  +1 nueva esta semana
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Candidatos nuevos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  +12 desde ayer
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {isAdmin && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total usuarios
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,543</div>
                <p className="text-xs text-muted-foreground">
                  +45 nuevos este mes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Empleos publicados
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">187</div>
                <p className="text-xs text-muted-foreground">
                  +12 esta semana
                </p>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'Empresas registradas' : 'Notificaciones'}
            </CardTitle>
            {isAdmin ? (
              <Building2 className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Bell className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isAdmin ? '89' : '3'}
            </div>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? '+4 nuevas este mes' : '2 sin leer'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Actividad
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24%</div>
            <p className="text-xs text-muted-foreground">
              vs. mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
            <CardDescription>
              Tus últimas acciones en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {isJobSeeker && 'Aplicaste a Desarrollador Frontend en TechCorp'}
                      {isEmployer && 'Publicaste nueva oferta: Diseñador UX/UI'}
                      {isAdmin && 'Revisaste aplicaciones pendientes'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Hace {i + 1} hora{i > 0 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Enlaces rápidos</CardTitle>
            <CardDescription>
              Accesos directos a funciones importantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={ROUTES.PROFILE}>
                <User className="h-4 w-4 mr-2" />
                Mi perfil
              </Link>
            </Button>
            
            {isJobSeeker && (
              <>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href={ROUTES.JOBS}>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar empleos
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/applications">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Mis aplicaciones
                  </Link>
                </Button>
              </>
            )}

            {isEmployer && (
              <>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/jobs/post">
                    <Plus className="h-4 w-4 mr-2" />
                    Publicar oferta
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href={ROUTES.MY_JOBS}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    Mis ofertas
                  </Link>
                </Button>
              </>
            )}

            {isAdmin && (
              <>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href={ROUTES.USERS}>
                    <Users className="h-4 w-4 mr-2" />
                    Gestionar usuarios
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/moderation">
                    <Shield className="h-4 w-4 mr-2" />
                    Moderación
                  </Link>
                </Button>
              </>
            )}
            
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={ROUTES.SETTINGS}>
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} } from '@/hooks/auth/use-google-auth';
import { loginSchema, type LoginFormData } from '@/validators/auth.schema';
import { ROUTES } from '@/constants/routes.constants';

/**
 * Formulario de login
 */
export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { signInWithGoogle, renderGoogleButton, isGoogleReady } = useGoogleAuth();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    const success = await login(data);
    if (success) {
      router.push(ROUTES.DASHBOARD);
    }
  };

  // Renderizar botón de Google al montar el componente
  React.useEffect(() => {
    if (isGoogleReady) {
      renderGoogleButton('google-signin-button', {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: '100%',
      });
    }
  }, [isGoogleReady, renderGoogleButton]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Iniciar sesión
        </h1>
        <p className="text-muted-foreground mt-2">
          Ingresa a tu cuenta para continuar
        </p>
      </div>

      {/* Google Sign In Button */}
      <div className="space-y-3">
        <div id="google-signin-button" className="w-full" />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              O continúa con
            </span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contraseña"
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    Recordarme
                  </FormLabel>
                </FormItem>
              )}
            />

            <Link 
              href="/forgot-password" 
              className="text-sm text-primary hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Iniciar sesión
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{' '}
        <Link href={ROUTES.REGISTER} className="text-primary hover:underline font-medium">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};