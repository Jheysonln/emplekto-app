# 🚀 JobPlatform - Plataforma de Empleo Full Stack

Una plataforma de empleo moderna construida con **Next.js 14**, **.NET 8** y **SQL Server**, similar a ComputraBajo, Indeed o LinkedIn Jobs.

## 🏗️ Arquitectura del Sistema

### **Backend (.NET 8)**
- **API REST** con autenticación JWT
- **Clean Architecture** simplificada (3 capas)
- **Dapper ORM** con Stored Procedures
- **Google OAuth** integrado
- **SQL Server** como base de datos
- **Serilog** para logging
- **Swagger** para documentación

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

## 🚀 Instalación y Configuración

### **Backend (.NET 8)**

```bash
# Crear proyecto API
dotnet new webapi -n JobPlatform.Api
cd JobPlatform.Api

# Instalar paquetes NuGet
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.AspNetCore.Authentication.Google
dotnet add package System.IdentityModel.Tokens.Jwt
dotnet add package Dapper
dotnet add package Microsoft.Data.SqlClient
dotnet add package BCrypt.Net-Next
dotnet add package Serilog.AspNetCore

# Configurar appsettings.json
```

**appsettings.json:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=JobPlatformDB;Trusted_Connection=true;TrustServerCertificate=true;"
  },
  "JwtSettings": {
    "SecretKey": "your-super-secret-key-256-bits-minimum",
    "Issuer": "JobPlatformAPI",
    "Audience": "JobPlatformClient",
    "AccessTokenExpirationMinutes": 60,
    "RefreshTokenExpirationDays": 7
  },
  "GoogleAuth": {
    "ClientId": "your-google-client-id.googleusercontent.com",
    "ClientSecret": "your-google-client-secret"
  }
}
```

### **Frontend (Next.js 14)**

```bash
# Crear proyecto Next.js
npx create-next-app@latest jobplatform-frontend --typescript --tailwind --eslint --app
cd jobplatform-frontend

# Instalar dependencias principales
npm install zustand react-hook-form @hookform/resolvers zod @tanstack/react-query axios js-cookie next-themes date-fns clsx tailwind-merge class-variance-authority

# Instalar shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input form card toast dialog alert

# Instalar dependencias de desarrollo
npm install --save-dev @types/js-cookie prettier prettier-plugin-tailwindcss
```

**.env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=JobPlatform
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.googleusercontent.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### **Base de Datos (SQL Server)**

```sql
-- Crear base de datos
CREATE DATABASE JobPlatformDB;

-- Ejecutar los stored procedures proporcionados
-- Ver archivo: stored-procedures.sql
```

## 🏃‍♂️ Ejecutar el Proyecto

### **Backend**
```bash
cd JobPlatform.Api
dotnet run
# API disponible en: http://localhost:5000
# Swagger UI: http://localhost:5000/swagger
```

### **Frontend**
```bash
cd jobplatform-frontend
npm run dev
# App disponible en: http://localhost:3000
```

## 📁 Estructura del Proyecto

```
JobPlatform/
├── backend/
│   ├── JobPlatform.Api/
│   │   ├── Controllers/
│   │   ├── Services/
│   │   ├── Models/
│   │   ├── DTOs/
│   │   ├── Data/
│   │   ├── Auth/
│   │   └── Middleware/
│   └── Database/
│       └── StoredProcedures/
├── frontend/
│   ├── src/
│   │   ├── app/                    # App Router
│   │   ├── core/                   # Dominio
│   │   ├── infrastructure/         # HTTP clients
│   │   ├── presentation/           # UI components
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   └── validators/
│   │   └── shared/                 # Utils y tipos
│   └── public/
└── docs/
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