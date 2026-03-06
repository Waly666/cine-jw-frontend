const userService = require('../services/user.service');

async function getAll(req, res) {
    const users = await userService.getAll();
    res.json({ message: 'Usuarios disponibles MDFKs', users });
}

async function register(req, res) {
    try {
        const { username, password, role } = req.body;
        const usuario = await userService.register(username, password, role);
        res.status(201).json({ message: 'Usuario registrado exitosamente MDFKs', usuario });
    } catch (err) {
        res.status(400).json({ message: err.message + ' MDFKs' });
    }
}

async function update(req, res) {
    const usuario = await userService.update(req.params.id, req.body);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado MDFKs' });
    res.json({ message: 'Usuario actualizado exitosamente MDFKs', usuario });
}

async function remove(req, res) {
    const usuario = await userService.remove(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado MDFKs' });
    res.json({ message: 'Usuario eliminado exitosamente MDFKs', usuario });
}

module.exports = { getAll, register, update, remove };