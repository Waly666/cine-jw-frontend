const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/user.controller');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/',              authenticateToken, isAdmin,  controller.getAll);
router.post('/register',     controller.register);
router.put('/edit/:id',      authenticateToken, isAdmin,  controller.update);
router.delete('/delete/:id', authenticateToken, isAdmin,  controller.remove);

module.exports = router;