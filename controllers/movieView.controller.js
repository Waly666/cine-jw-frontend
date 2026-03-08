const MovieView = require('../models/MovieView');

async function registerView(req, res) {
    try {
        const { movieId } = req.body;
        if (!movieId) return res.status(400).json({ message: 'movieId es requerido MDFKs' });

        // Verificar si ya la vio hoy
        const hoy        = new Date();
        const inicioDia  = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        const finDia     = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1);

        const yaVio = await MovieView.findOne({
            user:     req.user.id,
            movie:    movieId,
            viewedAt: { $gte: inicioDia, $lt: finDia }
        });

        // Si ya la vio hoy no contamos doble
        if (yaVio) {
            return res.json({ message: 'Vista ya registrada hoy MDFKs', yaVio: true });
        }

        const view = new MovieView({
            user:  req.user.id,
            movie: movieId
        });

        await view.save();
        res.status(201).json({ message: 'Vista registrada MDFKs', view });

    } catch (err) {
        res.status(500).json({ message: err.message + ' MDFKs' });
    }
}

async function getMyViews(req, res) {
    try {
        const ahora     = new Date();
        const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        const finMes    = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0);

        const vistas = await MovieView.countDocuments({
            user:     req.user.id,
            viewedAt: { $gte: inicioMes, $lte: finMes }
        });

        const subscription = await require('../models/Subscription')
            .findOne({ user: req.user.id, activa: true })
            .populate('plan');

        const limite = subscription?.plan?.limiteRecursos || 0;

        res.json({
            message:   'Vistas del mes MDFKs',
            vistas,
            limite,
            restantes: limite === 0 ? 'Ilimitado' : limite - vistas
        });

    } catch (err) {
        res.status(500).json({ message: err.message + ' MDFKs' });
    }
}

module.exports = { registerView, getMyViews };