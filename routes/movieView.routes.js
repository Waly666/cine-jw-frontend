const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/movieView.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { checkSubscription, checkMovieLimit } = require('../middlewares/subscription.middleware');

router.post('/view',     authenticateToken, checkSubscription, checkMovieLimit, controller.registerView);
router.get('/my-views',  authenticateToken, checkSubscription, controller.getMyViews);

module.exports = router;