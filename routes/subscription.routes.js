const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/subscription.controller');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

// Solo admin - primero las rutas específicas
router.get('/',                   authenticateToken, isAdmin,   controller.getAll);

// Rutas con auth
router.get('/plans',              authenticateToken,            controller.getPlans);
router.get('/my-subscription',    authenticateToken,            controller.getMySubscription);
router.post('/subscribe',         authenticateToken,            controller.subscribe);
router.put('/renew',              authenticateToken,            controller.renew);
router.put('/cancel',             authenticateToken,            controller.cancel);

// Rutas con :id al final siempre
router.put('/:id',                authenticateToken, isAdmin,   controller.updateById);
router.delete('/:id',             authenticateToken, isAdmin,   controller.deleteById);

module.exports = router;