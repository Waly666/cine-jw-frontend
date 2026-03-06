const subscriptionService = require('../services/subscription.service');

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

module.exports = { getPlans, getMySubscription, getAll, subscribe, renew, cancel };