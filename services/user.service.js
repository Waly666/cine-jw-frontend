const bcrypt = require('bcrypt');
const User   = require('../models/User');

async function getAll() {
    return await User.find({}, { password: 0 });
}

async function register(username, password, role) {
    const existe = await User.findOne({ username });
    if (existe) throw new Error('El usuario ya existe');
    const hash    = await bcrypt.hash(password, 10);
    const usuario = new User({ username, password: hash, role: role || 'user' });
    await usuario.save();
    return { username: usuario.username, role: usuario.role };
}

async function update(id, data) {
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return await User.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
    return await User.findByIdAndDelete(id);
}

module.exports = { getAll, register, update, remove };