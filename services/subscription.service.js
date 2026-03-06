const Subscription = require('../models/Subscription');
const Plan         = require('../models/Plan');

// Obtener todos los planes
async function getPlans() {
    return await Plan.find();
}

// Obtener suscripción activa de un usuario
async function getMySubscription(userId) {
    return await Subscription.findOne({ user: userId, activa: true }).populate('plan');
}

// Obtener todas las suscripciones (admin)
async function getAll() {
    return await Subscription.find().populate('user', 'username role').populate('plan');
}

// Suscribirse a un plan
async function subscribe(userId, planId) {
    const plan = await Plan.findById(planId);
    if (!plan) throw new Error('Plan no encontrado');

    // Verificar si ya tiene suscripción activa
    const existing = await Subscription.findOne({ user: userId, activa: true });
    if (existing) throw new Error('Ya tienes una suscripción activa');

    // Calcular fecha de vencimiento (30 días)
    const fechaInicio = new Date();
    const fechaFin    = new Date();
    fechaFin.setDate(fechaFin.getDate() + 30);

    const subscription = new Subscription({
        user: userId,
        plan: planId,
        fechaInicio,
        fechaFin,
        activa: true,
        pagado: true // simulamos el pago
    });

    await subscription.save();
    return await subscription.populate('plan');
}

// Renovar suscripción
async function renew(userId) {
    const subscription = await Subscription.findOne({ user: userId }).sort({ fechaFin: -1 }).populate('plan');
    if (!subscription) throw new Error('No tienes suscripciones previas');

    // Nueva fecha de vencimiento desde hoy + 30 días
    const fechaInicio = new Date();
    const fechaFin    = new Date();
    fechaFin.setDate(fechaFin.getDate() + 30);

    subscription.fechaInicio = fechaInicio;
    subscription.fechaFin    = fechaFin;
    subscription.activa      = true;
    subscription.pagado      = true;

    await subscription.save();
    return subscription;
}

// Cancelar suscripción
async function cancel(userId) {
    const subscription = await Subscription.findOne({ user: userId, activa: true });
    if (!subscription) throw new Error('No tienes suscripción activa');

    subscription.activa = false;
    await subscription.save();
    return subscription;
}

// Verificar y actualizar suscripciones vencidas
async function checkExpired() {
    const now = new Date();
    const result = await Subscription.updateMany(
        { fechaFin: { $lt: now }, activa: true },
        { activa: false }
    );
    return result;
}

module.exports = { getPlans, getMySubscription, getAll, subscribe, renew, cancel, checkExpired };