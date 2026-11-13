const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerSchema, loginSchema, validate } = require('../middleware/validation');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;