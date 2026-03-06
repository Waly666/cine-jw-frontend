const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/movie.controller');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');
const { checkSubscription } = require('../middlewares/subscription.middleware');

router.get('/', authenticateToken, checkSubscription, controller.getAll);
router.post('/add',          authenticateToken, isAdmin,  controller.create);
router.put('/edit/:id',      authenticateToken, isAdmin,  controller.update);
router.delete('/delete/:id', authenticateToken, isAdmin,  controller.remove);

module.exports = router;