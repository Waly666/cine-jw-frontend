const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'http://72.60.175.120:4000';

// ========================
// TOKEN HELPERS
// ========================
function getToken() {
    return localStorage.getItem('accessToken');
}

function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

function decodeToken(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

function isTokenExpired(token) {
    const payload = decodeToken(token);
    if (!payload) return true;
    return payload.exp * 1000 < Date.now();
}

function getCurrentUser() {
    const token = getToken();
    if (!token) return null;
    return decodeToken(token);
}

function isAdmin() {
    const user = getCurrentUser();
    return user?.role === 'admin';
}

// ========================
// REFRESH TOKEN
// ========================
async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');

    const res  = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });

    const data = await res.json();
    if (!res.ok) throw new Error('Refresh failed');

    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
}

// ========================
// AUTHENTICATED FETCH
// ========================
async function apiFetch(url, options = {}) {
    let token = getToken();

    if (token && isTokenExpired(token)) {
        try {
            token = await refreshAccessToken();
        } catch {
            logout();
            return;
        }
    }

    const res = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        }
    });

    // Solo intentar refresh si el mensaje es de token expirado
    // NO hacer refresh si es por suscripción
    if (res.status === 403) {
        const data = await res.clone().json();
        const isTokenError = data.message?.toLowerCase().includes('token');
        
        if (isTokenError) {
            try {
                token = await refreshAccessToken();
                return apiFetch(url, options);
            } catch {
                logout();
                return;
            }
        }
    }

    return res;
}

// ========================
// AUTH GUARDS
// ========================

// Redirige a login si no hay token válido
function requireAuth() {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
        // Intentar refresh antes de redirigir
        refreshAccessToken()
            .catch(() => window.location.href = 'login.html');
    }
}

// Redirige al dashboard si ya está logueado
function redirectIfLoggedIn() {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
        window.location.href = 'dashboard.html';
    }
}

// ========================
// LOGOUT
// ========================
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}