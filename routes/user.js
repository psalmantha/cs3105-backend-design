const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUserRegistration } = require('../middleware/authMiddleware');
const loginLimiter = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', loginLimiter, loginUser);

module.exports = router;
