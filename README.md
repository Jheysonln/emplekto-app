# 🚀 JobPlatform - Plataforma de Empleo Full Stack

Una plataforma de empleo moderna construida con **Next.js 14**, **.NET 8** y **SQL Server**, similar a ComputraBajo, Indeed o LinkedIn Jobs.

## 🏗️ Arquitectura del Sistema

### **Frontend (Next.js 14)**
- **App Router** con Route Groups
- **Clean Architecture** con separación de capas
- **TypeScript** end-to-end
- **shadcn/ui** + **Tailwind CSS**
- **Zustand** para estado global
- **React Query** para data fetching
- **React Hook Form** + **Zod** para validaciones

## 🎯 Funcionalidades Principales

### **Autenticación**
- ✅ Login/Registro tradicional
- ✅ Google OAuth
- ✅ JWT con Refresh Tokens
- ✅ Manejo de roles (JobSeeker, Employer, Admin, Moderator)
- ✅ Protección de rutas
- ✅ Middleware de seguridad

### **Gestión de Usuarios**
- ✅ Perfiles de usuario
- ✅ Panel de administración
- ✅ Sistema de roles
- ✅ Activación/Desactivación de usuarios

### **UI/UX**
- ✅ Tema dark/light
- ✅ Responsive design
- ✅ Componentes modernos
- ✅ Loading states
- ✅ Error boundaries
- ✅ Toast notifications

### **Frontend (Next.js 15)**

```

## 📁 Estructura del Proyecto
```
└── 📁emplekto-app
    └── 📁src
        └── 📁app                          # 🚀 NEXT.JS 15 APP ROUTER
            └── 📁(auth)                   # 📁 Route Group - Rutas de autenticación
                └── 📁login
                    ├── page.tsx           # 📄 Página de inicio de sesión
                └── 📁register
                    ├── page.tsx           # 📄 Página de registro de usuarios
                ├── layout.tsx             # 🎨 Layout para rutas de auth (sin sidebar)
            └── 📁(protected)              # 📁 Route Group - Rutas protegidas
                └── 📁dashboard
                    ├── page.tsx           # 📊 Dashboard principal con estadísticas
                └── 📁profile
                    ├── page.tsx           # 👤 Perfil del usuario actual
                └── 📁users
                    └── 📁[id]
                        ├── page.tsx       # 👤 Detalle específico de usuario
                    ├── page.tsx           # 👥 Lista de usuarios (admin/moderator)
                ├── layout.tsx             # 🔒 Layout protegido con AuthGuard + Sidebar
            ├── error.tsx                  # ⚠️ Página de error global
            ├── favicon.ico                # 🏷️ Icono de la aplicación
            ├── globals.css                # 🎨 Estilos globales + Variables CSS + Tailwind
            ├── layout.tsx                 # 🏗️ Root layout con providers y metadata
            ├── loading.tsx                # ⏳ Componente de loading global
            ├── not-found.tsx              # 404 Página no encontrada
            ├── page.tsx                   # 🏠 Landing page pública

        └── 📁core                         # 🧠 BUSINESS LOGIC (Clean Architecture)
            └── 📁entities                 # 📋 Entidades del dominio
                ├── Auth.entity.ts         # 🔐 Entidades de autenticación (AuthSession, LoginCredentials)
                ├── index.ts               # 📤 Barrel exports de todas las entidades
                ├── User.entity.ts         # 👤 Entidades de usuario (User, CreateUserData, UpdateUserData)
            └── 📁repositories            # 🔌 Interfaces de acceso a datos
                ├── auth.repository.ts     # 🔐 Interface para operaciones de autenticación
                ├── index.ts               # 📤 Barrel exports de repositorios
                ├── user.repository.ts     # 👤 Interface para operaciones de usuarios
            └── 📁use-cases               # 🎯 Lógica de negocio encapsulada
                └── 📁auth                 # 🔐 Casos de uso de autenticación
                    ├── google-login.use-case.ts    # 🔑 Login con Google OAuth
                    ├── login.use-case.ts           # 🔑 Login tradicional con email/password
                    ├── logout.use-case.ts          # 🚪 Cerrar sesión
                    ├── refresh-token.use-case.ts   # 🔄 Renovar tokens de acceso
                    ├── register.use-case.ts        # 📝 Registro de nuevos usuarios
                └── 📁users                # 👥 Casos de uso de usuarios
                    ├── activate-user.use-case.ts   # ✅ Activar usuario (admin)
                    ├── deactivate-user.use-case.ts # ❌ Desactivar usuario (admin)
                    ├── get-user.use-case.ts        # 👤 Obtener usuario por ID
                    ├── get-users.use-case.ts       # 👥 Obtener lista paginada de usuarios
                    ├── update-user.use-case.ts     # ✏️ Actualizar datos de usuario
                ├── index.ts               # 📤 Barrel exports de todos los use cases

        └── 📁infrastructure              # 🔌 EXTERNAL CONCERNS (APIs, Datos)
            └── 📁api                      # 🌐 Clientes HTTP para comunicación con backend
                └── 📁clients              # 📡 Clientes API específicos
                    ├── auth-api.client.ts # 🔐 Cliente para endpoints de autenticación
                    ├── base-api.client.ts # 🔧 Cliente base con configuración Axios
                    ├── user-api.client.ts # 👤 Cliente para endpoints de usuarios
                └── 📁interceptors         # ⚡ Interceptors HTTP
                    ├── auth.interceptor.ts # 🔑 Interceptor para agregar tokens automáticamente
                    ├── error.interceptor.ts # ⚠️ Interceptor para manejo global de errores
            └── 📁mappers                  # 🔄 Conversión entre DTOs y Entities
                ├── auth.mapper.ts         # 🔐 Mapeo AuthResponse ↔ AuthSession
                ├── user.mapper.ts         # 👤 Mapeo UserDto ↔ User Entity
            └── 📁repositories            # 🛠️ Implementaciones de los repositorios
                ├── auth.repository.impl.ts # 🔐 Implementación AuthRepository usando API
                ├── user.repository.impl.ts # 👤 Implementación UserRepository usando API
            ├── index.ts                   # 📤 Barrel exports de infraestructura

        └── 📁presentation                # 🎨 UI LAYER (React Components)
            └── 📁components               # 🧩 Componentes React
                └── 📁features             # 🎯 Componentes por funcionalidad
                    └── 📁auth             # 🔐 Componentes de autenticación
                        ├── login-form.tsx # 📝 Formulario de login con validación
                        ├── logout-button.tsx # 🔴 Botón de logout con confirmación
                    └── 📁dashboard        # 📊 Componentes del dashboard
                        ├── dashboard-stats.tsx # 📈 Tarjetas de estadísticas
                    └── 📁users            # 👥 Componentes de usuarios
                        ├── user-form.tsx  # 📝 Formulario para editar usuario
                        ├── users-table.tsx # 📋 Tabla de usuarios con paginación
                └── 📁layouts              # 🏗️ Layouts reutilizables
                    ├── auth-layout.tsx    # 🎨 Layout para páginas de auth (centrado)
                    ├── main-layout.tsx    # 🎨 Layout principal con sidebar y navbar
                └── 📁ui                   # 🎨 Componentes UI base (shadcn/ui)
                    ├── button.tsx         # 🔘 Componente Button reutilizable
                    ├── form.tsx           # 📝 Componentes de formulario
                    ├── input.tsx          # ⌨️ Componente Input reutilizable
                    ├── toast.tsx          # 🍞 Sistema de notificaciones
                ├── index.ts               # 📤 Barrel exports de componentes
            └── 📁guards                  # 🛡️ Protección de rutas
                ├── auth-guard.tsx         # 🔒 Guard para rutas que requieren auth
            └── 📁hooks                   # 🎣 Custom React Hooks
                ├── use-api.ts             # 🌐 Hook para configuración React Query
                ├── use-auth.ts            # 🔐 Hook para operaciones de autenticación
                ├── use-users.ts           # 👥 Hook para operaciones de usuarios
            └── 📁providers               # 🔧 Context Providers
                ├── app.provider.tsx      # 🏗️ Provider principal que combina todos
                ├── auth.provider.tsx     # 🔐 Provider para contexto de auth
                ├── react-query.provider.tsx # 📡 Provider para React Query config
            └── 📁stores                  # 🗄️ Estados globales (Zustand)
                ├── auth.store.ts          # 🔐 Estado de autenticación (user, tokens)
                ├── ui.store.ts            # 🎨 Estado de UI (theme, sidebar)
                ├── user.store.ts          # 👥 Estado de usuarios (lista, filtros)
            └── 📁validators              # ✅ Validación de formularios (Zod)
                ├── auth.schemas.ts        # 🔐 Schemas para login, register, Google auth
                ├── user.schemas.ts        # 👤 Schemas para CRUD de usuarios

        └── 📁shared                      # 🛠️ UTILITIES (Código compartido)
            └── 📁config                  # ⚙️ Configuraciones
                ├── env.config.ts          # 🌍 Variables de entorno centralizadas
            └── 📁constants               # 📋 Constantes de la aplicación
                ├── api.constants.ts       # 🌐 URLs, endpoints, headers HTTP
                ├── app.constants.ts       # 🏠 Rutas, query keys, roles, paginación
            └── 📁types                   # 📝 Tipos TypeScript compartidos
                ├── api.types.ts           # 🌐 Tipos para responses HTTP
                ├── auth.types.ts          # 🔐 DTOs y enums de autenticación
                ├── common.types.ts        # 🔧 Tipos comunes (ID, Pagination, Loading)
            └── 📁utils                   # 🔧 Funciones utilitarias
                ├── api.utils.ts           # 🌐 Helpers para APIs (error handling, URLs)
                ├── cn.ts                  # 🎨 Utility para combinar clases Tailwind
                ├── storage.ts             # 💾 Helpers para almacenamiento seguro
        ├── middleware.ts                  # 🛡️ Next.js middleware (protección server-side)

    ├── .editorconfig                      # ⚙️ Configuración del editor
    ├── .env.example                       # 📄 Ejemplo de variables de entorno
    ├── .env.local                         # 🔒 Variables de entorno locales (no en git)
    ├── .gitignore                         # 🚫 Archivos ignorados por Git
    ├── components.json                    # 🎨 Configuración de shadcn/ui
    ├── next-env.d.ts                      # 📝 Tipos TypeScript de Next.js
    ├── next.config.ts                     # ⚙️ Configuración de Next.js
    ├── package-lock.json                  # 📦 Lock file de dependencias
    ├── package.json                       # 📦 Dependencias y scripts
    ├── postcss.config.mjs                 # 🎨 Configuración PostCSS para Tailwind
    ├── README.md                          # 📚 Documentación del proyecto
    ├── tailwind.config.js                 # 🎨 Configuración de Tailwind CSS
    └── tsconfig.json                      # 📝 Configuración TypeScript
```
## 🔐 Sistema de Roles

- **JobSeeker (1)**: Candidatos que buscan empleo
- **Employer (2)**: Empresas que publican ofertas
- **Admin (3)**: Administradores del sistema
- **Moderator (4)**: Moderadores de contenido

## 🛡️ Seguridad

- JWT tokens con expiración
- Refresh tokens en cookies HttpOnly
- Validación de roles en rutas
- CORS configurado
- Headers de seguridad
- Sanitización de inputs
- Rate limiting (recomendado para producción)

## 📦 Tecnologías Utilizadas

### **Backend**
- .NET 8
- Dapper ORM
- SQL Server
- JWT Bearer Authentication  
- Google OAuth
- BCrypt para passwords
- Serilog para logging
- Swagger/OpenAPI

### **Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand (estado global)
- React Query (data fetching)
- React Hook Form + Zod
- Lucide React (iconos)

## 🚀 Próximas Funcionalidades

- [ ] Sistema de empleos (CRUD)
- [ ] Búsqueda avanzada de empleos
- [ ] Sistema de aplicaciones
- [ ] Chat en tiempo real
- [ ] Notificaciones push
- [ ] Sistema de archivos/CV
- [ ] Analytics y reportes
- [ ] Pagos integrados
- [ ] API de terceros (LinkedIn, etc.)

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE.md](LICENSE.md) para detalles.

## 👥 Equipo

- **Desarrollo Full Stack**: Tu nombre
- **UI/UX Design**: Tu nombre
- **DevOps**: Tu nombre

---

⭐ **¡Dale una estrella al proyecto si te fue útil!**