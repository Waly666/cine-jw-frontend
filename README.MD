# 🎬 CineJWT — Plataforma de Películas Online

Aplicación web fullstack para gestión de una plataforma de películas online. Incluye autenticación JWT con refresh token, control de roles, encriptación de contraseñas y un dashboard interactivo con gestión completa de películas y usuarios.

---

## 📋 Descripción del Proyecto

CineJWT es una aplicación fullstack que permite a los usuarios explorar un catálogo de películas y a los administradores gestionar tanto el catálogo como los usuarios registrados. El sistema implementa autenticación segura con JWT, tokens de refresco automático y encriptación de contraseñas con bcrypt.

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

| Tecnología      | Descripción                         |
| --------------- | ----------------------------------- |
| HTML5           | Estructura                          |
| CSS3            | Estilos con variables y animaciones |
| JavaScript ES6+ | Lógica del cliente                  |
| Fetch API       | Comunicación con el backend         |
| LocalStorage    | Almacenamiento de tokens            |

---

## 🗂️ Estructura del Proyecto

```
cinejwt/
├── controllers/
│   ├── auth.controller.js       # Lógica de login y refresh token
│   ├── movie.controller.js      # Lógica CRUD de películas
│   └── user.controller.js       # Lógica CRUD de usuarios
├── middlewares/
│   ├── auth.middleware.js       # Verificación de token y rol admin
│   └── logger.middleware.js     # Log de peticiones HTTP
├── models/
│   ├── User.js                  # Esquema de usuario
│   └── Movie.js                 # Esquema de película
├── routes/
│   ├── auth.routes.js           # Rutas de autenticación
│   ├── movie.routes.js          # Rutas de películas
│   └── user.routes.js           # Rutas de usuarios
├── services/
│   ├── auth.service.js          # Servicios de autenticación
│   ├── movie.service.js         # Servicios de películas
│   └── user.service.js          # Servicios de usuarios
├── frontend/
│   ├── js/
│   │   └── auth.js              # Helper reutilizable de autenticación
│   ├── login.html               # Página de inicio de sesión
│   ├── register.html            # Página de registro
│   └── dashboard.html           # Panel de control
├── .env                         # Variables de entorno (no subir a GitHub)
├── .env.example                 # Plantilla de variables de entorno
├── seed.js                      # Script para poblar la base de datos
└── server.js                    # Punto de entrada del servidor
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

### 4. Poblar la base de datos (opcional)

```bash
node seed.js
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

**POST `/auth/refresh`**

```json
// Body
{
    "refreshToken": "eyJ..."
}

// Respuesta exitosa
{
    "accessToken": "eyJ..."
}
```

---

### 🎬 Películas — `/movies`

| Método | Ruta                 | Descripción                | Auth | Rol        |
| ------ | -------------------- | -------------------------- | ---- | ---------- |
| GET    | `/movies`            | Listar todas las películas | ✅   | user/admin |
| POST   | `/movies/add`        | Agregar película           | ✅   | admin      |
| PUT    | `/movies/edit/:id`   | Editar película            | ✅   | admin      |
| DELETE | `/movies/delete/:id` | Eliminar película          | ✅   | admin      |

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

**POST `/users/register`**

```json
{
  "username": "carlos",
  "password": "carlos123",
  "role": "user"
}
```

---

## 🖥️ Frontend

### Páginas

| Archivo          | Descripción                                               |
| ---------------- | --------------------------------------------------------- |
| `login.html`     | Inicio de sesión con diseño cinematográfico               |
| `register.html`  | Registro de nuevos usuarios con validación en tiempo real |
| `dashboard.html` | Panel de control con gestión completa                     |

### `auth.js` — Helper de autenticación

Archivo reutilizable que expone las siguientes funciones:

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

| Funcionalidad            | User | Admin |
| ------------------------ | ---- | ----- |
| Ver listado de películas | ✅   | ✅    |
| Ver tráiler de películas | ✅   | ✅    |
| Agregar película         | ❌   | ✅    |
| Editar película          | ❌   | ✅    |
| Eliminar película        | ❌   | ✅    |
| Ver listado de usuarios  | ❌   | ✅    |
| Agregar usuario          | ❌   | ✅    |
| Editar usuario           | ❌   | ✅    |
| Eliminar usuario         | ❌   | ✅    |
| Ver estadísticas         | ❌   | ✅    |

---

## 🔒 Seguridad

- Contraseñas encriptadas con **bcrypt** (10 rondas de sal)
- **Access Token** expira en 20 minutos
- **Refresh Token** expira en 7 días
- Rutas protegidas requieren header: `Authorization: Bearer <token>`
- Solo usuarios con rol **admin** pueden gestionar películas y usuarios
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
node server.js   # Inicia el servidor
node seed.js     # Pobla la base de datos con datos iniciales
```
