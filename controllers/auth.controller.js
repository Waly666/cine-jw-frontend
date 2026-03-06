const authService = require('../services/auth.service');

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const tokens = await authService.login(username, password);
        res.json({ message: 'Login exitoso MDFKs', ...tokens });
    } catch (err) {
        res.status(401).json({ message: err.message + ' MDFKs' });
    }
}

async function refresh(req, res) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: 'Refresh token no proporcionado MDFKs' });
        const tokens = await authService.refresh(refreshToken);
        res.json(tokens);
    } catch (err) {
        res.status(403).json({ message: err.message + ' MDFKs' });
    }
}

module.exports = { login, refresh };