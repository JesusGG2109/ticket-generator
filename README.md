# EventHub TECNM — Conference Ticket Generator

Plataforma fullstack para la gestión de eventos académicos y generación de tickets de asistencia. Proyecto desarrollado como práctica integral universitaria (TECNM) cubriendo arquitectura cliente-servidor, persistencia relacional, validación de datos y autenticación con JSON Web Tokens.

> **Estado:** En desarrollo activo — funcionalidades base completas, remasterización visual y módulo de roles pendientes (ver [Roadmap](#roadmap)).

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Funcionalidades](#funcionalidades-implementadas)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Endpoints de la API](#endpoints-de-la-api)
- [Documentación de la API (Swagger)](#documentación-de-la-api-swagger)
- [Flujo de autenticación](#flujo-de-autenticación)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Testing](#testing)
- [Deploy](#deploy)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Convenciones de commits](#convenciones-de-commits)
- [Contribuidores](#contribuidores)
- [Licencia](#licencia)

---

## Descripción

EventHub TECNM permite a los usuarios registrarse, iniciar sesión, consultar el catálogo de eventos disponibles y generar un ticket de asistencia personalizado. El backend expone una API REST sobre Express con persistencia en PostgreSQL mediante Sequelize, validación con Zod y autenticación con JWT. El frontend es una SPA en React + TypeScript construida con Vite y estilizada con TailwindCSS.

El proyecto está organizado en dos aplicaciones independientes — `client/` y `server/` — que se comunican exclusivamente vía HTTP, lo que permite desplegarlas por separado y razonar sobre cada capa de forma aislada.

---

## Stack tecnológico

### Frontend (`client/`)

| Tecnología | Uso |
|---|---|
| **React 19** | Librería UI |
| **TypeScript** | Tipado estático |
| **Vite** (rolldown-vite) | Bundler y dev server |
| **React Router DOM 7** | Routing SPA |
| **React Hook Form** | Manejo de formularios |
| **Zustand** | Estado global (con middleware `persist`) |
| **Axios** | Cliente HTTP con interceptores |
| **TailwindCSS 4** | Estilos utility-first |

### Backend (`server/`)

| Tecnología | Uso |
|---|---|
| **Node.js** | Runtime |
| **Express 5** | Framework HTTP |
| **Sequelize 6** | ORM relacional |
| **PostgreSQL** | Base de datos |
| **Zod** | Validación de schemas |
| **bcryptjs** | Hashing de contraseñas |
| **jsonwebtoken** | Emisión y verificación de JWT |
| **dotenv** | Carga de variables de entorno |
| **cors** | CORS configurable |
| **swagger-ui-express** | UI interactiva de la API |
| **swagger-jsdoc** | Generación del spec OpenAPI desde JSDoc |
| **jest** (dev) | Test runner |
| **supertest** (dev) | Tests HTTP de la API |
| **sqlite3** (dev) | Base de datos en memoria para tests |
| **nodemon** (dev) | Hot reload |

---

## Arquitectura

```
┌─────────────────────────────┐         HTTPS/HTTP          ┌──────────────────────────────┐
│   Frontend (Vite + React)   │  ───────────────────────►  │  Backend (Express + Node.js) │
│                             │  ◄───────────────────────  │                              │
│  - Pages / Components       │     JSON (con JWT en       │  - Routes                    │
│  - Zustand (auth store)     │      Authorization header) │  - Controllers               │
│  - Axios (interceptor JWT)  │                            │  - Validators (Zod)          │
│  - React Router             │                            │  - Middlewares (auth JWT)    │
└─────────────────────────────┘                            │  - Models (Sequelize)        │
                                                           └──────────────┬───────────────┘
                                                                          │
                                                                          ▼
                                                              ┌────────────────────────┐
                                                              │  PostgreSQL            │
                                                              │  Tablas: Users, Events │
                                                              └────────────────────────┘
```

**Patrón backend:** MVC + Validators. Cada request sigue el flujo:
`Route → Middleware (opcional) → Controller → Validator (Zod) → Model (Sequelize) → DB`.

**Patrón frontend:** separación por responsabilidad. Cada feature tiene su `service` (capa HTTP), `store` (estado), `components` (UI) y `pages` (composición).

---

## Funcionalidades implementadas

### Eventos
- [x] Listado público de eventos
- [x] Búsqueda por título en cliente
- [x] Crear evento
- [x] Editar evento
- [x] Eliminar evento
- [x] Validación con Zod en backend
- [x] Manejo de errores HTTP (400, 404, 500)

### Tickets
- [x] Formulario de generación de ticket con datos personalizados
- [x] Vista de confirmación con preview del ticket

### Autenticación
- [x] Registro de usuarios con email único
- [x] Login con verificación bcrypt
- [x] Emisión de JWT firmado con secreto del servidor
- [x] Middleware de protección de rutas backend
- [x] Endpoint `GET /api/auth/me` protegido
- [x] Persistencia de sesión en `localStorage` (Zustand `persist`)
- [x] Interceptor axios que inyecta `Bearer <token>` automáticamente
- [x] Auto-logout cuando el backend devuelve 401 (token expirado/inválido)
- [x] Rutas privadas en frontend con `<ProtectedRoute>`
- [x] Navbar dinámico según estado de sesión
- [x] Campo `role` en modelo User con default `"user"` (preparado para autorización futura)

### Infraestructura
- [x] Variables de entorno con `dotenv` y `.env.example` publicado (cliente y servidor)
- [x] Estructura modular cliente/servidor independiente
- [x] Historial Git con commits semánticos separados por funcionalidad
- [x] **Swagger UI interactiva en `/api/docs`** (OpenAPI 3.0.3)
- [x] **24 tests automatizados** con Jest + Supertest (SQLite en memoria)
- [x] **Healthcheck en `/api/health`** para monitoreo
- [x] CORS configurable vía `CORS_ORIGIN`
- [x] Script `npm start` para producción
- [x] Modo `production` omite `sequelize.sync()` (seguro para datos reales)

---

## Estructura de carpetas

```
conference-ticket-generator/
├── client/                              # Frontend React + Vite
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/                    # login-form, register-form, protected-route
│   │   │   ├── confirmation-page/       # vista post-registro de ticket
│   │   │   ├── events-list/             # listado y CRUD de eventos
│   │   │   ├── layouts/                 # main-layout (fondo, header, decoraciones)
│   │   │   └── ticket-form-page/        # formulario de ticket + hero
│   │   ├── contexts/                    # ShowTicketContext
│   │   ├── hooks/                       # use-show-ticket
│   │   ├── pages/                       # home, events, login, register
│   │   ├── services/
│   │   │   ├── api.ts                   # instancia axios + interceptores JWT
│   │   │   ├── authService.ts           # register, login, getMe
│   │   │   └── eventService.ts          # CRUD de eventos
│   │   ├── store/
│   │   │   ├── auth.ts                  # Zustand persistente (token + user)
│   │   │   └── user.ts                  # store del ticket-generator
│   │   ├── App.tsx                      # router + navbar dinámica
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── server/                              # Backend Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js              # conexión Sequelize ↔ Postgres / SQLite en tests
│   │   │   └── swagger.js               # spec OpenAPI 3.0.3
│   │   ├── controllers/
│   │   │   ├── auth.controller.js       # register, login, me
│   │   │   └── event.controller.js      # CRUD eventos
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js       # verifica JWT y pobla req.user
│   │   ├── models/
│   │   │   ├── Event.js
│   │   │   ├── User.js                  # name, email, passwordHash, role
│   │   │   └── index.js                 # barrel central
│   │   ├── routes/
│   │   │   ├── auth.routes.js           # documentadas con @swagger
│   │   │   └── event.routes.js          # documentadas con @swagger
│   │   ├── validators/
│   │   │   ├── authValidator.js         # registerSchema, loginSchema
│   │   │   └── eventValidator.js
│   │   ├── app.js                       # factory createApp() (testeable)
│   │   └── index.js                     # entrypoint dev/prod (carga env + listen)
│   ├── tests/
│   │   ├── env.js                       # NODE_ENV=test, JWT_SECRET de prueba
│   │   ├── setup.js                     # globalSetup Jest
│   │   ├── teardown.js                  # globalTeardown Jest
│   │   ├── health.test.js               # smoke test bootstrap
│   │   ├── auth.test.js                 # 12 tests de autenticación
│   │   └── events.test.js               # 10 tests de CRUD eventos
│   ├── jest.config.js
│   ├── .env                             # NO se commitea
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Endpoints de la API

> Base URL: `http://localhost:3000/api`

### Auth (`/api/auth`)

| Método | Ruta | Protegido | Descripción | Body | Respuesta |
|---|---|---|---|---|---|
| `POST` | `/auth/register` | No | Crea usuario y devuelve JWT | `{ name, email, password }` | `201 { user, token }` |
| `POST` | `/auth/login` | No | Autentica y devuelve JWT | `{ email, password }` | `200 { user, token }` |
| `GET` | `/auth/me` | **Sí** | Devuelve el usuario autenticado | — | `200 { id, name, email, role, ... }` |

### Eventos (`/api/events`)

| Método | Ruta | Protegido | Descripción | Body |
|---|---|---|---|---|
| `GET` | `/events` | No | Lista todos los eventos | — |
| `GET` | `/events/:id` | No | Obtiene un evento por ID | — |
| `POST` | `/events` | No¹ | Crea un evento | `{ title, description, location, date }` |
| `PUT` | `/events/:id` | No¹ | Actualiza un evento | parcial |
| `DELETE` | `/events/:id` | No¹ | Elimina un evento | — |

¹ El CRUD de eventos quedará protegido cuando se implemente el módulo de roles.

### Utilidades

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Mensaje de bienvenida |
| `GET` | `/api/health` | Healthcheck (uptime, environment, timestamp) |
| `GET` | `/api/docs` | UI interactiva Swagger |
| `GET` | `/api/docs.json` | Spec OpenAPI 3.0.3 en JSON |

### Códigos de error comunes

| Código | Significado |
|---|---|
| `400` | Datos inválidos (Zod) |
| `401` | No autenticado / token inválido / token expirado |
| `404` | Recurso no encontrado |
| `409` | Email ya registrado |
| `500` | Error interno del servidor |

---

## Documentación de la API (Swagger)

La API se autodocumenta con **OpenAPI 3.0.3** mediante `swagger-jsdoc` (lee anotaciones `@swagger` en los archivos de rutas) + `swagger-ui-express` (sirve la UI).

| Ruta | Para qué |
|---|---|
| [`/api/docs`](http://localhost:3000/api/docs) | UI interactiva: probar endpoints, ver schemas, autenticar con JWT |
| [`/api/docs.json`](http://localhost:3000/api/docs.json) | Spec OpenAPI completo (importable a Postman, Insomnia, Stoplight) |

**Cómo autenticar peticiones desde la UI:**

1. `POST /auth/login` o `POST /auth/register` desde la UI.
2. Copiar el `token` del response.
3. Click en **Authorize** (candado arriba a la derecha) → pegar `<token>` → Authorize.
4. Los endpoints con icono de candado (ej. `GET /auth/me`) ya enviarán `Authorization: Bearer <token>`.

**Schemas definidos:** `User`, `RegisterRequest`, `LoginRequest`, `AuthResponse`, `Event`, `EventInput`, `Error`, `ValidationError`.

**Responses comunes reusables:** `BadRequest`, `Unauthorized`, `NotFound`, `Conflict`, `ServerError`.

---

## Flujo de autenticación

```
┌────────────┐     1. POST /api/auth/login         ┌─────────────────────┐
│   React    │  ────────────────────────────────►  │   Express backend   │
│  LoginForm │     { email, password }              │                     │
└─────┬──────┘                                      │  - loginSchema.parse│
      │                                             │  - User.findOne     │
      │                                             │  - bcrypt.compare   │
      │                                             │  - jwt.sign         │
      │     2. { user, token }                      │                     │
      │  ◄──────────────────────────────────────── │                     │
      │                                             └─────────────────────┘
      ▼
┌────────────────────────────┐
│ useAuthStore.setAuth(...)  │  ─► persist guarda en localStorage("auth-storage")
└─────┬──────────────────────┘
      ▼
┌────────────────────────────┐
│ navigate("/eventos")       │
└─────┬──────────────────────┘
      ▼
┌────────────────────────────┐
│ <ProtectedRoute>           │  ─► isAuthenticated === true → renderiza
└─────┬──────────────────────┘
      ▼
┌────────────────────────────┐
│ Llamadas posteriores       │
│ api.get("/events")         │  ─► interceptor lee localStorage,
└────────────────────────────┘     agrega "Authorization: Bearer <token>"
```

**Logout:** `clearAuth()` limpia el store → `persist` borra `localStorage` → próxima navegación a ruta privada redirige a `/login`.

**Token expirado:** backend responde `401` → interceptor de respuesta detecta el código, limpia `localStorage` y dispara el evento `auth:unauthorized` → el store lo escucha y se resetea automáticamente.

---

## Requisitos previos

- **Node.js** ≥ 18
- **npm** ≥ 9
- **PostgreSQL** ≥ 14 corriendo en `localhost:5432`
- Una base de datos creada (por defecto se llama `eventhub_tecnm`)

```sql
-- Crear la base de datos desde psql
CREATE DATABASE eventhub_tecnm;
```

Las tablas (`Users`, `Events`) se crean automáticamente al arrancar el backend por `sequelize.sync()`.

---

## Instalación

Clonar el repositorio:

```bash
git clone <url-del-repo>
cd conference-ticket-generator
```

Instalar dependencias del backend:

```bash
cd server
npm install
```

Instalar dependencias del frontend:

```bash
cd ../client
npm install
```

---

## Variables de entorno

Crear `server/.env` a partir de `server/.env.example`:

```bash
cd server
cp .env.example .env   # en Windows: copy .env.example .env
```

Editar `server/.env` con los valores locales:

**Backend** (`server/.env`):

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NODE_ENV` | Entorno (`development` / `production` / `test`) | `development` |
| `PORT` | Puerto donde escucha Express | `3000` |
| `DB_NAME` | Nombre de la base de datos PostgreSQL | `eventhub_tecnm` |
| `DB_USER` | Usuario PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña PostgreSQL | `tu_password` |
| `DB_HOST` | Host de la base de datos | `localhost` |
| `DB_PORT` | Puerto PostgreSQL | `5432` |
| `JWT_SECRET` | Secreto para firmar JWT (¡cambiar en producción!) | `cadena_larga_aleatoria` |
| `JWT_EXPIRES_IN` | Tiempo de vida del token | `7d` |
| `CORS_ORIGIN` | Origen(es) permitido(s) — `*` o lista separada por comas | `*` / `https://app.com,https://www.app.com` |

**Frontend** (`client/.env`):

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base de la API. Si se omite, usa `http://localhost:3000/api` | `https://api.tudominio.com/api` |

> **Los archivos `.env` están incluidos en `.gitignore` y NO deben commitearse nunca.**

---

## Ejecución

### Backend

```bash
cd server
npm run dev
```

El servidor queda escuchando en `http://localhost:3000`. Al arrancar deberías ver:

```
Servidor corriendo en puerto 3000
Base de datos conectada
Tablas sincronizadas
```

### Frontend

En otra terminal:

```bash
cd client
npm run dev
```

Vite abre el cliente en `http://localhost:5173` (por defecto).

### Verificación rápida

```bash
# Healthcheck del backend
curl http://localhost:3000/

# Registrar un usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo","email":"demo@test.com","password":"secret123"}'
```

---

## Testing

El backend tiene tests automatizados con **Jest 30** + **Supertest** corriendo contra una base **SQLite en memoria** (vía Sequelize), de modo que no se necesita Postgres para correr la suite y los tests se aíslan entre sí.

### Ejecutar

```bash
cd server
npm test            # corre toda la suite
npm run test:watch  # modo watch
```

### Suites incluidas

| Archivo | Cobertura | Tests |
|---|---|---|
| `tests/health.test.js` | Bootstrap de Express + dialect SQLite en tests | 2 |
| `tests/auth.test.js` | Register, login, GET /me (felices, errores, hashing bcrypt, token format) | 12 |
| `tests/events.test.js` | CRUD eventos (GET lista, GET id, POST, PUT, DELETE — happy y 400/404) | 10 |
| **Total** | | **24** |

### Cómo funciona el entorno de test

- `tests/env.js` establece `NODE_ENV=test`, `JWT_SECRET` de prueba.
- `server/src/config/database.js` detecta `NODE_ENV === "test"` y usa `sqlite::memory:` en vez de Postgres.
- Cada suite hace `sequelize.sync({ force: true })` y un `truncate` por `beforeEach` para aislar tests.
- `server/src/app.js` exporta una factory `createApp()` que Supertest importa sin levantar un puerto real.

---

## Deploy

El proyecto está **listo para desplegar** en plataformas como **Render**, **Railway**, **Fly.io**, **Heroku** (backend) y **Vercel**, **Netlify**, **Cloudflare Pages** (frontend). Aún no se ha desplegado; quedan listos los archivos y scripts.

### Backend

```bash
cd server
npm install --omit=dev
NODE_ENV=production npm start
```

**Lo que cambia en producción:**

- `sequelize.sync()` **NO** se ejecuta (evita destruir datos por accidente). Para cambios de esquema en prod, usar migraciones con `sequelize-cli`.
- `CORS_ORIGIN` debe definirse explícitamente (ej. `https://tu-frontend.vercel.app`) para no aceptar peticiones de cualquier origen.
- `JWT_SECRET` debe ser una cadena larga y aleatoria distinta de la de desarrollo.

**Healthcheck para load balancers:** `GET /api/health` devuelve `{ status, uptime, environment, timestamp }`.

### Frontend

```bash
cd client
npm install
npm run build  # genera dist/
```

Subir `dist/` a Vercel/Netlify. Definir la variable `VITE_API_URL` apuntando a la URL pública del backend, ej. `https://eventhub-api.onrender.com/api`.

### Variables a configurar por plataforma

| Plataforma | Variables que hay que definir |
|---|---|
| **Render / Railway** (backend) | `NODE_ENV=production`, `DB_*`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`, `PORT` (algunas plataformas lo inyectan solas) |
| **Vercel / Netlify** (frontend) | `VITE_API_URL` apuntando al backend desplegado |

---

## Screenshots

> _Placeholders — reemplazar con capturas reales antes de la entrega._

| Vista | Imagen |
|---|---|
| Home (formulario de ticket) | `./docs/screenshots/home.png` |
| Registro | `./docs/screenshots/register.png` |
| Login | `./docs/screenshots/login.png` |
| Listado de eventos | `./docs/screenshots/events.png` |
| Ticket generado | `./docs/screenshots/ticket.png` |

---

## Roadmap

### Completado recientemente
- [x] Documentación OpenAPI/Swagger de la API
- [x] Tests automatizados backend (Jest + Supertest, 24 tests)
- [x] Preparación para deploy (CORS, healthcheck, scripts, env vars)
- [x] Limpieza técnica (axios unificado, tipos sin `any`, flujo de ticket arreglado)

### Próximas iteraciones (orden tentativo)
- [ ] **Roles y autorización** — proteger CRUD de eventos según `user.role` (`user` / `admin`)
- [ ] **Asociación User ↔ Event** — registrar quién creó cada evento, mostrar "mis eventos"
- [ ] **Dashboard de administración** — métricas básicas (eventos activos, usuarios registrados)
- [ ] **QR en tickets** — código único escaneable por evento
- [ ] **Exportación a PDF** del ticket
- [ ] **Analytics** de asistencia
- [ ] **Remasterización visual** — UI moderna, animaciones, mejora UX general

### Mejoras técnicas pendientes
- [ ] Tipos compartidos entre cliente y servidor (carpeta `shared/` o paquete)
- [ ] Tests automatizados frontend (Vitest + React Testing Library)
- [ ] CI básico (GitHub Actions: lint + build + test)
- [ ] Migraciones Sequelize (en lugar de `sync()`) para producción
- [ ] Manejo centralizado de errores backend (middleware error handler)

---

## Convenciones de commits

Cada funcionalidad se commitea por separado para facilitar revisión y rollback. Los mensajes son cortos, en español, en imperativo y describen la unidad de cambio:

```
# Autenticación
Configuracion de variables de entorno con dotenv
Modelo User y configuracion de autenticacion
Validaciones y manejo de errores en autenticacion
Implementacion de autenticacion JWT en backend
Middleware de proteccion de rutas
Servicio de autenticacion y axios con token en frontend
Store de autenticacion con persistencia
Pantallas login y register con autenticacion
Proteccion de rutas privadas y navbar dinamica

# Limpieza técnica
Refactor de llamadas HTTP con axios
Mejora de tipado y eliminacion de any
Limpieza de flujo de formularios y recarga manual

# Documentación + testing + deploy
Configuracion de Swagger y documentacion de API
Configuracion de Jest y Supertest
Tests de autenticacion
Tests de eventos
Preparacion del proyecto para deploy
Actualizacion de documentacion tecnica
```

### Ramas

- `main` — rama estable
- `jesus-dev` — rama de desarrollo principal

> No se hace merge a `main` hasta validar la entrega con el docente.

---

## Contribuidores

| Nombre | Rol | Contacto |
|---|---|---|
| Jesús (autor principal) | Desarrollo fullstack | — |

> Agregar aquí a cualquier colaborador adicional, con su GitHub o email institucional.

---

## Licencia

Proyecto académico desarrollado para el Tecnológico Nacional de México. Sin licencia comercial. Uso libre con fines educativos citando la fuente.
