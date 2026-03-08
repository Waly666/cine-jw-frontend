const Subscription = require('../models/Subscription');
const MovieView    = require('../models/MovieView');

async function checkSubscription(req, res, next) {
    try {
        // Admin no necesita suscripción
        if (req.user.role === 'admin') return next();

        const subscription = await Subscription.findOne({
            user:   req.user.id,
            activa: true
        }).populate('plan');

        if (!subscription) {
            return res.status(403).json({ message: 'No tienes una suscripción activa MDFKs' });
        }

        if (new Date() > new Date(subscription.fechaFin)) {
            subscription.activa = false;
            await subscription.save();
            return res.status(403).json({ message: 'Tu suscripción ha vencido MDFKs' });
        }

        req.subscription = subscription;
        next();

    } catch (err) {
        res.status(500).json({ message: 'Error verificando suscripción MDFKs' });
    }
}

async function checkMovieLimit(req, res, next) {
    try {
        // Admin no tiene límite
        if (req.user.role === 'admin') return next();

        const subscription = req.subscription;
        const limite = subscription.plan.limiteRecursos;

        // 0 = ilimitado (Enterprise)
        if (limite === 0) return next();

        // Contar vistas del mes actual
        const ahora     = new Date();
        const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        const finMes    = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0);

        const vistas = await MovieView.countDocuments({
            user:      req.user.id,
            viewedAt:  { $gte: inicioMes, $lte: finMes }
        });

        if (vistas >= limite) {
            return res.status(403).json({
                message: `Has alcanzado el límite de ${limite} películas de tu plan este mes MDFKs`,
                limite,
                vistas
            });
        }

        next();

    } catch (err) {
        res.status(500).json({ message: 'Error verificando límite MDFKs' });
    }
}

module.exports = { checkSubscription, checkMovieLimit };