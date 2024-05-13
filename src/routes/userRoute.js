const { registerController, loginController } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register',registerController);
router.post('/login',loginController);

module.exports = router;