require('dotenv').config();
const mongoose = require('mongoose');
const Plan     = require('./models/Plan');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        await Plan.deleteMany();

        await Plan.insertMany([
            {
                nombre:         'Basic',
                precio:         5000,
                limiteRecursos: 5,
                descripcion:    'Acceso a 5 películas por mes'
            },
            {
                nombre:         'Pro',
                precio:         15000,
                limiteRecursos: 15,
                descripcion:    'Acceso a 15 películas por mes'
            },
            {
                nombre:         'Enterprise',
                precio:         30000,
                limiteRecursos: 0,
                descripcion:    'Acceso ilimitado a todas las películas'
            }
        ]);

        console.log('Planes insertados correctamente ✅');
        mongoose.disconnect();
    })
    .catch(err => console.error('Error:', err));