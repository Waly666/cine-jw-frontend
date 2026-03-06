# 🎬 Movie Online - Backend API

API REST para una plataforma de películas online con autenticación JWT, control de roles y base de datos MongoDB.

---

## 📋 Descripción del Proyecto

Movie Online es una API REST desarrollada con Node.js y Express que permite gestionar usuarios y películas. Incluye autenticación con JWT, refresh tokens, encriptación de contraseñas con bcrypt y control de acceso basado en roles (admin/user).

---

## 🛠️ Tecnologías Usadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Node.js | v24+ | Entorno de ejecución |
| Express | v5+ | Framework web |
| MongoDB | Local | Base de datos NoSQL |
| Mongoose | v8+ | ODM para MongoDB |
| JWT | - | Autenticación con tokens |
| Bcrypt | - | Encriptación de contraseñas |
| Dotenv | - | Variables de entorno |
| CORS | - | Control de acceso entre dominios |

---

## 🗂️ Estructura de Carpetas

```
backend/
├── controllers/
│   ├── auth.controller.js      # Lógica de login y refresh token
│   ├── movie.controller.js     # Lógica CRUD de películas
│   └── user.controller.js      # Lógica CRUD de usuarios
├── middlewares/
│   ├── auth.middleware.js      # Verificación de token y rol admin
│   └── logger.middleware.js    # Log de peticiones
├── models/
│   ├── User.js                 # Esquema de usuario
│   └── Movie.js                # Esquema de película
├── routes/
│   ├── auth.routes.js          # Rutas de autenticación
│   ├── movie.routes.js         # Rutas de películas
│   └── user.routes.js          # Rutas de usuarios
├── services/
│   ├── auth.service.js         # Servicios de autenticación
│   ├── movie.service.js        # Servicios de películas
│   └── user.service.js         # Servicios de usuarios
├── .env                        # Variables de entorno (no subir a GitHub)
├── .env.example                # Ejemplo de variables de entorno
├── seed.js                     # Script para poblar la base de datos
└── server.js                   # Punto de entrada del servidor
```

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/cine-jwt.git
cd cine-jwt
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/cineDB
SECRET_KEY=claveCine_123
REFRESH_SECRET_KEY=refreshClaveCine_456
```

### 4. Iniciar MongoDB
Asegúrate de tener MongoDB instalado y corriendo localmente.

### 5. Poblar la base de datos (opcional)
```bash
node seed.js
```

### 6. Iniciar el servidor
```bash
node server.js
```

Deberías ver:
```
Conectado a MongoDB ✅
Servidor escuchando en el puerto 3000 ✅
```

---

## 🔐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `MONGO_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/cineDB` |
| `SECRET_KEY` | Clave secreta para Access Token | `claveCine_123` |
| `REFRESH_SECRET_KEY` | Clave secreta para Refresh Token | `refreshClaveCine_456` |

> ⚠️ **Nunca subas el archivo `.env` a GitHub.** Agrégalo al `.gitignore`.

---

## 📡 Documentación de Rutas (Endpoints)

### 🔑 Autenticación — `/auth`

| Método | Ruta | Descripción | Auth requerida |
|--------|------|-------------|----------------|
| POST | `/auth/login` | Iniciar sesión | No |
| POST | `/auth/refresh` | Renovar access token | No |

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

| Método | Ruta | Descripción | Auth requerida | Rol |
|--------|------|-------------|----------------|-----|
| GET | `/movies` | Listar todas las películas | ✅ | user/admin |
| POST | `/movies/add` | Agregar película | ✅ | admin |
| PUT | `/movies/edit/:id` | Editar película | ✅ | admin |
| DELETE | `/movies/delete/:id` | Eliminar película | ✅ | admin |

**GET `/movies`** — Header requerido:
```
Authorization: Bearer <accessToken>
```

**POST `/movies/add`**
```json
// Body
{
    "title": "Interstellar",
    "director": "Christopher Nolan",
    "genre": "Sci-Fi",
    "imagen": "https://url-de-la-imagen.jpg",
    "trailer": "https://youtube.com/watch?v=...",
    "resumen": "Descripción de la película..."
}
```

---

### 👤 Usuarios — `/users`

| Método | Ruta | Descripción | Auth requerida | Rol |
|--------|------|-------------|----------------|-----|
| GET | `/users` | Listar todos los usuarios | ✅ | admin |
| POST | `/users/register` | Registrar usuario | No | - |
| PUT | `/users/edit/:id` | Editar usuario | ✅ | admin |
| DELETE | `/users/delete/:id` | Eliminar usuario | ✅ | admin |

**POST `/users/register`**
```json
// Body
{
    "username": "carlos",
    "password": "carlos123",
    "role": "user"
}
```

---

## 🔒 Seguridad

- Las contraseñas se encriptan con **bcrypt** (10 rondas de sal)
- Los tokens de acceso expiran en **20 minutos**
- Los refresh tokens expiran en **7 días**
- Las rutas protegidas requieren el header: `Authorization: Bearer <token>`
- Solo los usuarios con rol **admin** pueden agregar, editar o eliminar películas y usuarios

---

## 👥 Usuarios de Prueba

| Username | Password | Rol |
|----------|----------|-----|
| walter | WALTER123 | admin |
| julian | julian456 | user |
| sandra | sandra789 | user |
| pedro | pedro321 | user |
| santiago | santiago987 | user |

---

## 📝 Middleware de Logs

Cada petición al servidor genera un log en la terminal con el siguiente formato:
```
[2025-03-05T10:30:00.000Z] GET /movies - IP: ::1
```
