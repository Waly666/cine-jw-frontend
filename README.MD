# 🎬 CineJWT — Plataforma de Películas Online

Aplicación web fullstack para gestión de una plataforma de películas online. Incluye autenticación JWT con refresh token, control de roles, motor de suscripciones con planes, encriptación de contraseñas y un dashboard interactivo con modo claro/oscuro.

---

## 📋 Descripción del Proyecto

CineJWT es una aplicación fullstack que permite a los usuarios explorar un catálogo de películas según su plan de suscripción, y a los administradores gestionar el catálogo, los usuarios y las suscripciones. El sistema implementa autenticación segura con JWT, tokens de refresco automático, encriptación de contraseñas con bcrypt y un motor de suscripciones con tres planes diferenciados.

---

## 🛠️ Tecnologías Usadas

### Backend

| Tecnología           | Descripción                                    |
| -------------------- | ---------------------------------------------- |
| Node.js              | Entorno de ejecución                           |
| Express v5           | Framework web                                  |
| MongoDB              | Base de datos NoSQL                            |
| Mongoose             | ODM para MongoDB                               |
| JSON Web Token (JWT) | Autenticación con Access Token + Refresh Token |
| Bcrypt               | Encriptación de contraseñas (10 rondas)        |
| Dotenv               | Variables de entorno                           |
| CORS                 | Control de acceso entre dominios               |

### Frontend

| Tecnología      | Descripción                                        |
| --------------- | -------------------------------------------------- |
| HTML5           | Estructura                                         |
| CSS3            | Estilos con variables, glassmorphism y animaciones |
| JavaScript ES6+ | Lógica del cliente                                 |
| Fetch API       | Comunicación con el backend                        |
| LocalStorage    | Almacenamiento de tokens y preferencias            |
| Google Fonts    | Playfair Display + Raleway                         |

---

## 🗂️ Estructura del Proyecto

```
cinejwt/
├── controllers/
│   ├── auth.controller.js          # Lógica de login y refresh token
│   ├── movie.controller.js         # Lógica CRUD de películas
│   ├── user.controller.js          # Lógica CRUD de usuarios
│   └── subscription.controller.js  # Lógica CRUD de suscripciones
├── middlewares/
│   ├── auth.middleware.js          # Verificación de token y rol admin
│   ├── logger.middleware.js        # Log de peticiones HTTP
│   └── subscription.middleware.js  # Verificación de suscripción activa
├── models/
│   ├── User.js                     # Esquema de usuario
│   ├── Movie.js                    # Esquema de película
│   ├── Plan.js                     # Esquema de plan de suscripción
│   └── Subscription.js             # Esquema de suscripción
├── routes/
│   ├── auth.routes.js              # Rutas de autenticación
│   ├── movie.routes.js             # Rutas de películas
│   ├── user.routes.js              # Rutas de usuarios
│   └── subscription.routes.js      # Rutas de suscripciones
├── services/
│   ├── auth.service.js             # Servicios de autenticación
│   ├── movie.service.js            # Servicios de películas
│   ├── user.service.js             # Servicios de usuarios
│   └── subscription.service.js     # Servicios de suscripciones
├── frontend/
│   ├── js/
│   │   └── auth.js                 # Helper reutilizable de autenticación
│   ├── login.html                  # Página de inicio de sesión
│   ├── register.html               # Página de registro
│   └── dashboard.html              # Panel de control
├── .env                            # Variables de entorno (no subir a GitHub)
├── .env.example                    # Plantilla de variables de entorno
├── seed.js                         # Script para poblar usuarios y películas
├── seedPlans.js                    # Script para poblar los planes
└── server.js                       # Punto de entrada del servidor
```

---

## ⚙️ Instalación y Configuración

### Requisitos previos

- Node.js v18+
- MongoDB instalado y corriendo localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/Waly666/cine-jw-frontend.git
cd cine-jw-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/cineDB
SECRET_KEY=claveCine_123
REFRESH_SECRET_KEY=refreshClaveCine_456
```

### 4. Poblar la base de datos

```bash
node seed.js       # Inserta usuarios y películas de prueba
node seedPlans.js  # Inserta los planes de suscripción
```

### 5. Iniciar el servidor

```bash
node server.js
```

Deberías ver:

```
Conectado a MongoDB ✅
Servidor escuchando en el puerto 3000 ✅
```

### 6. Abrir el frontend

Abre `frontend/login.html` en tu navegador con un servidor local como Live Server de VS Code.

---

## 🔐 Variables de Entorno

| Variable             | Descripción                      | Ejemplo                            |
| -------------------- | -------------------------------- | ---------------------------------- |
| `PORT`               | Puerto del servidor              | `3000`                             |
| `MONGO_URI`          | URI de conexión a MongoDB        | `mongodb://localhost:27017/cineDB` |
| `SECRET_KEY`         | Clave secreta para Access Token  | `claveCine_123`                    |
| `REFRESH_SECRET_KEY` | Clave secreta para Refresh Token | `refreshClaveCine_456`             |

> ⚠️ **Nunca subas el archivo `.env` a GitHub.** Está incluido en `.gitignore`.

---

## 📡 Documentación de Rutas (Endpoints)

### 🔑 Autenticación — `/auth`

| Método | Ruta            | Descripción          | Auth |
| ------ | --------------- | -------------------- | ---- |
| POST   | `/auth/login`   | Iniciar sesión       | No   |
| POST   | `/auth/refresh` | Renovar access token | No   |

**POST `/auth/login`**

```json
// Body
{
    "username": "walter",
    "password": "WALTER123"
}

// Respuesta exitosa
{
    "message": "Login exitoso MDFKs",
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
}
```

---

### 🎬 Películas — `/movies`

| Método | Ruta                 | Descripción       | Auth | Rol                          |
| ------ | -------------------- | ----------------- | ---- | ---------------------------- |
| GET    | `/movies`            | Listar películas  | ✅   | user con suscripción / admin |
| POST   | `/movies/add`        | Agregar película  | ✅   | admin                        |
| PUT    | `/movies/edit/:id`   | Editar película   | ✅   | admin                        |
| DELETE | `/movies/delete/:id` | Eliminar película | ✅   | admin                        |

> ⚠️ Los usuarios sin suscripción activa reciben un `403` al intentar listar películas.

**Campos de película:**

```json
{
  "title": "Interstellar",
  "director": "Christopher Nolan",
  "genre": "Sci-Fi",
  "imagen": "https://url-del-poster.jpg",
  "trailer": "https://youtube.com/watch?v=...",
  "resumen": "Descripción de la película..."
}
```

**Géneros disponibles:**
`Action`, `Comedy`, `Drama`, `Horror`, `Sci-Fi`, `Romance`, `Thriller`, `Fantasy`, `Western`, `Musical`, `Documentary`, `War`, `Historical`, `Animation`

---

### 👤 Usuarios — `/users`

| Método | Ruta                | Descripción               | Auth | Rol   |
| ------ | ------------------- | ------------------------- | ---- | ----- |
| GET    | `/users`            | Listar todos los usuarios | ✅   | admin |
| POST   | `/users/register`   | Registrar usuario         | No   | —     |
| PUT    | `/users/edit/:id`   | Editar usuario            | ✅   | admin |
| DELETE | `/users/delete/:id` | Eliminar usuario          | ✅   | admin |

---

### 💳 Suscripciones — `/subscriptions`

| Método | Ruta                             | Descripción                    | Auth | Rol        |
| ------ | -------------------------------- | ------------------------------ | ---- | ---------- |
| GET    | `/subscriptions/plans`           | Listar planes disponibles      | ✅   | user/admin |
| GET    | `/subscriptions/my-subscription` | Ver mi suscripción activa      | ✅   | user       |
| POST   | `/subscriptions/subscribe`       | Suscribirse a un plan          | ✅   | user       |
| PUT    | `/subscriptions/renew`           | Renovar suscripción            | ✅   | user       |
| PUT    | `/subscriptions/cancel`          | Cancelar suscripción           | ✅   | user       |
| GET    | `/subscriptions`                 | Listar todas las suscripciones | ✅   | admin      |
| PUT    | `/subscriptions/:id`             | Editar suscripción             | ✅   | admin      |
| DELETE | `/subscriptions/:id`             | Eliminar suscripción           | ✅   | admin      |

**POST `/subscriptions/subscribe`**

```json
{
  "planId": "ID_DEL_PLAN"
}
```

---

## 💰 Planes de Suscripción

| Plan       | Precio  | Límite de Películas | Descripción                            |
| ---------- | ------- | ------------------- | -------------------------------------- |
| Basic      | $5/mes  | 5 películas         | Acceso a 5 películas por mes           |
| Pro        | $15/mes | 15 películas        | Acceso a 15 películas por mes          |
| Enterprise | $30/mes | Ilimitado           | Acceso ilimitado a todas las películas |

> La suscripción vence automáticamente **30 días** después de la fecha de inicio.

---

## 🖥️ Frontend

### Páginas

| Archivo          | Descripción                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `login.html`     | Inicio de sesión con diseño cinematográfico y fondo animado               |
| `register.html`  | Registro con validación en tiempo real y barra de fortaleza de contraseña |
| `dashboard.html` | Panel de control con CRUD completo, suscripciones y modo claro/oscuro     |

### `auth.js` — Helper de autenticación

```javascript
getToken(); // Obtiene el access token del localStorage
getRefreshToken(); // Obtiene el refresh token del localStorage
decodeToken(token); // Decodifica el payload del JWT
isTokenExpired(token); // Verifica si el token expiró
getCurrentUser(); // Retorna el usuario actual decodificado
isAdmin(); // Retorna true si el usuario es admin
refreshAccessToken(); // Renueva el access token automáticamente
apiFetch(url, opts); // Fetch autenticado con refresh automático
requireAuth(); // Redirige a login si no está autenticado
redirectIfLoggedIn(); // Redirige al dashboard si ya está logueado
logout(); // Limpia tokens y redirige a login
```

### Dashboard — Funcionalidades por rol

| Funcionalidad                        | User                 | Admin |
| ------------------------------------ | -------------------- | ----- |
| Ver listado de películas             | ✅ (con suscripción) | ✅    |
| Ver tráiler de películas             | ✅ (con suscripción) | ✅    |
| Agregar / Editar / Eliminar película | ❌                   | ✅    |
| Ver listado de usuarios              | ❌                   | ✅    |
| Agregar / Editar / Eliminar usuario  | ❌                   | ✅    |
| Ver suscripción activa               | ✅                   | ❌    |
| Ver planes y suscribirse             | ✅                   | ❌    |
| Renovar / Cancelar suscripción       | ✅                   | ❌    |
| Ver todas las suscripciones          | ❌                   | ✅    |
| Editar / Eliminar suscripciones      | ❌                   | ✅    |
| Ver estadísticas                     | ❌                   | ✅    |
| Modo claro/oscuro                    | ✅                   | ✅    |

---

## 🔒 Seguridad

- Contraseñas encriptadas con **bcrypt** (10 rondas de sal)
- **Access Token** expira en 20 minutos
- **Refresh Token** expira en 7 días
- Rutas protegidas requieren header: `Authorization: Bearer <token>`
- Solo usuarios con rol **admin** pueden gestionar películas, usuarios y suscripciones
- Usuarios sin suscripción activa no pueden acceder al catálogo de películas
- Los admins están exentos de la verificación de suscripción
- El frontend renueva el token automáticamente sin interrumpir la sesión
- Las variables sensibles se gestionan con **dotenv**
- **CORS** habilitado para comunicación frontend ↔ backend

---

## 📝 Middleware de Logs

Cada petición al servidor genera un log en la terminal:

```
[2026-03-06T10:30:00.000Z] POST /auth/login - IP: ::1
[2026-03-06T10:30:05.000Z] GET /movies - IP: ::1
```

---

## 👥 Usuarios de Prueba

| Username | Password    | Rol   |
| -------- | ----------- | ----- |
| walter   | WALTER123   | admin |
| julian   | julian456   | user  |
| sandra   | sandra789   | user  |
| pedro    | pedro321    | user  |
| santiago | santiago987 | user  |

---

## 🚀 Scripts disponibles

```bash
node server.js     # Inicia el servidor
node seed.js       # Pobla usuarios y películas iniciales
node seedPlans.js  # Pobla los planes de suscripción
```
