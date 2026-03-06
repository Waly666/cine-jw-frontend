const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/subscription.controller');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

// Rutas públicas con auth
router.get('/plans',              authenticateToken,            controller.getPlans);
router.get('/my-subscription',    authenticateToken,            controller.getMySubscription);
router.post('/subscribe',         authenticateToken,            controller.subscribe);
router.put('/renew',              authenticateToken,            controller.renew);
router.put('/cancel',             authenticateToken,            controller.cancel);
router.put('/:id',    authenticateToken, isAdmin, controller.updateById);
router.delete('/:id', authenticateToken, isAdmin, controller.deleteById);

// Solo admin
router.get('/',                   authenticateToken, isAdmin,   controller.getAll);

module.exports = router;