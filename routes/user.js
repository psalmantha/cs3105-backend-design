const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { validateUserRegistration, authenticateToken } = require('../middleware/authMiddleware');
const loginLimiter = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', loginLimiter, loginUser);

router.get('/profile', authenticateToken, getProfile);

module.exports = router;
