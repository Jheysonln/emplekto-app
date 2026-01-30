import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware de Next.js para protección de rutas y redirecciones
 * ✅ NO usa localStorage - solo lógica de rutas
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obtener token de las cookies (si tu backend usa HttpOnly cookies)
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isAuthenticated = !!refreshToken;

  // Rutas que requieren autenticación
  const protectedRoutes = [
    '/dashboard',
    '/profile', 
    '/settings',
    '/users',
  ];

  // Rutas solo para usuarios no autenticados
  const guestOnlyRoutes = ['/login', '/register'];

  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Verificar si es una ruta solo para invitados
  const isGuestOnlyRoute = guestOnlyRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Redirigir usuarios no autenticados desde rutas protegidas
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirigir usuarios autenticados desde rutas de invitados
  if (isGuestOnlyRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Headers de seguridad
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  return response;
}

// Configuración del matcher para el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};