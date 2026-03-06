const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan:        { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    fechaInicio: { type: Date, required: true, default: Date.now },
    fechaFin:    { type: Date, required: true },
    activa:      { type: Boolean, default: true },
    pagado:      { type: Boolean, default: false }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);