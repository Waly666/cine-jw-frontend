const Movie = require('../models/Movie');

async function getAll() {
    return await Movie.find();
}

async function create(data) {
    const movie = new Movie(data);
    await movie.save();
    return movie;
}

async function update(id, data) {
    return await Movie.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
    return await Movie.findByIdAndDelete(id);
}

module.exports = { getAll, create, update, remove };