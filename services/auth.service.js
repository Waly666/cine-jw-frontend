const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Credenciales invalidas');

    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) throw new Error('Credenciales invalidas');

    const payload      = { id: user._id, username: user.username, role: user.role };
    const accessToken  = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '20m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });

    return { accessToken, refreshToken };
}

async function refresh(refreshToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
            if (err) reject(new Error('Refresh token invalido o expirado'));
            const payload     = { id: user.id, username: user.username, role: user.role };
            const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '20m' });
            resolve({ accessToken });
        });
    });
}

module.exports = { login, refresh };