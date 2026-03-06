const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:    { type: String, required: true },
    director: { type: String, required: true },
    genre:    { type: String, required: true },
    imagen:   { type: String, required: false },
    trailer:  { type: String, required: false },
    resumen:  { type: String, required: false, maxlength: 2000 }
});

module.exports = mongoose.model('Movie', movieSchema);