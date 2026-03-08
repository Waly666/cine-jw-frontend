const mongoose = require('mongoose');

const movieViewSchema = new mongoose.Schema({
    user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie:     { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    viewedAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('MovieView', movieViewSchema);