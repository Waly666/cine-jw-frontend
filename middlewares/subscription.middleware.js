const Subscription = require('../models/Subscription');

async function checkSubscription(req, res, next) {
    try {
        const subscription = await Subscription.findOne({
            user:   req.user.id,
            activa: true
        }).populate('plan');

        // Si no tiene suscripción activa
        if (!subscription) {
            return res.status(403).json({ message: 'No tienes una suscripción activa MDFKs' });
        }

        // Verificar si venció
        if (new Date() > new Date(subscription.fechaFin)) {
            subscription.activa = false;
            await subscription.save();
            return res.status(403).json({ message: 'Tu suscripción ha vencido MDFKs' });
        }

        // Adjuntar suscripción al request para usarla en otros middlewares
        req.subscription = subscription;
        next();

    } catch (err) {
        res.status(500).json({ message: 'Error verificando suscripción MDFKs' });
    }
}

// Verifica si el usuario no superó su límite de películas
async function checkMovieLimit(req, res, next) {
    try {
        const subscription = req.subscription;
        const limite = subscription.plan.limiteRecursos;

        // 0 = ilimitado (Enterprise)
        if (limite === 0) return next();

        // Aquí podrías contar cuántas películas ha visto el usuario
        // Por ahora pasamos al siguiente middleware
        next();

    } catch (err) {
        res.status(500).json({ message: 'Error verificando límite MDFKs' });
    }
}

module.exports = { checkSubscription, checkMovieLimit };