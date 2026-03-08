const Subscription = require('../models/Subscription');
const subscriptionService = require('../services/subscription.service');
//const Subscription = require('../models/Subscription'); // ← agrega esta línea

async function getPlans(req, res) {
    try {
        const plans = await subscriptionService.getPlans();
        res.json({ message: 'Planes disponibles MDFKs', plans });
    } catch (err) {
        res.status(500).json({ message: err.message + ' MDFKs' });
    }
}

async function getMySubscription(req, res) {
    try {
        const subscription = await subscriptionService.getMySubscription(req.user.id);
        if (!subscription) {
            return res.status(404).json({ message: 'No tienes suscripción activa MDFKs' });
        }
        res.json({ message: 'Suscripción activa MDFKs', subscription });
    } catch (err) {
        res.status(500).json({ message: err.message + ' MDFKs' });
    }
}

async function getAll(req, res) {
    try {
        const subscriptions = await subscriptionService.getAll();
        res.json({ message: 'Suscripciones MDFKs', subscriptions });
    } catch (err) {
        res.status(500).json({ message: err.message + ' MDFKs' });
    }
}

async function subscribe(req, res) {
    try {
        const { planId } = req.body;
        if (!planId) return res.status(400).json({ message: 'planId es requerido MDFKs' });
        const subscription = await subscriptionService.subscribe(req.user.id, planId);
        res.status(201).json({ message: 'Suscripción creada exitosamente MDFKs', subscription });
    } catch (err) {
        res.status(400).json({ message: err.message + ' MDFKs' });
    }
}

async function renew(req, res) {
    try {
        const subscription = await subscriptionService.renew(req.user.id);
        res.json({ message: 'Suscripción renovada exitosamente MDFKs', subscription });
    } catch (err) {
        res.status(400).json({ message: err.message + ' MDFKs' });
    }
}

async function cancel(req, res) {
    try {
        const subscription = await subscriptionService.cancel(req.user.id);
        res.json({ message: 'Suscripción cancelada MDFKs', subscription });
    } catch (err) {
        res.status(400).json({ message: err.message + ' MDFKs' });
    }
}
async function updateById(req, res) {
    try {
        const { activa, fechaFin, planId } = req.body;
        const sub = await Subscription.findByIdAndUpdate(
            req.params.id,
            { activa, fechaFin, plan: planId },
            { new: true }
        ).populate('plan');
        if (!sub) return res.status(404).json({ message: 'Suscripción no encontrada MDFKs' });
        res.json({ message: 'Suscripción actualizada MDFKs', subscription: sub });
    } catch (err) {
        res.status(500).json({ message: err.message + ' MDFKs' });
    }
}

async function deleteById(req, res) {
    try {
        const sub = await Subscription.findByIdAndDelete(req.params.id);
        if (!sub) return res.status(404).json({ message: 'Suscripción no encontrada MDFKs' });
        res.json({ message: 'Suscripción eliminada MDFKs' });
    } catch (err) {
        res.status(500).json({ message: err.message + ' MDFKs' });
    }
}

// Agrégalos al module.exports:
module.exports = { getPlans, getMySubscription, getAll, subscribe, renew, cancel, updateById, deleteById };
