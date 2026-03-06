const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    nombre:          { type: String, required: true, enum: ['Basic', 'Pro', 'Enterprise'] },
    precio:          { type: Number, required: true },
    limiteRecursos:  { type: Number, required: true, default: 0 }, // 0 = ilimitado
    descripcion:     { type: String, required: false }
});

module.exports = mongoose.model('Plan', planSchema);