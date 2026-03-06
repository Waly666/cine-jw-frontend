const movieService = require('../services/movie.service');

async function getAll(req, res) {
    const movies = await movieService.getAll();
    res.json({ message: 'Peliculas disponibles MDFKs', movies });
}

async function create(req, res) {
    const movie = await movieService.create(req.body);
    res.json({ message: 'Pelicula agregada exitosamente MDFKs', movie });
}

async function update(req, res) {
    const movie = await movieService.update(req.params.id, req.body);
    if (!movie) return res.status(404).json({ message: 'Pelicula no encontrada MDFKs' });
    res.json({ message: 'Pelicula actualizada exitosamente MDFKs', movie });
}

async function remove(req, res) {
    const movie = await movieService.remove(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Pelicula no encontrada MDFKs' });
    res.json({ message: 'Pelicula eliminada exitosamente MDFKs', movie });
}

module.exports = { getAll, create, update, remove };