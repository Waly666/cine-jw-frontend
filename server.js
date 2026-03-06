require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const { logger } = require('./middlewares/logger.middleware');

const authRoutes  = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes');
const userRoutes  = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.send('BIENVENIDO A MOVIE ON LINE MDFKs'));

app.use('/auth',   authRoutes);
app.use('/movies', movieRoutes);
app.use('/users',  userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoDB ✅');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en el puerto ${process.env.PORT} ✅`);
        });
    })
    .catch(err => console.error('Error conectando a MongoDB:', err));