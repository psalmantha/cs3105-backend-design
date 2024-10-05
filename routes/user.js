const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { validateUserRegistration } = require('../middleware/authMiddleware');
const loginLimiter = require('../middleware/rateLimitMiddleware');
const { verifyToken } = require('../utils/tokenUtils'); 

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);

router.post('/login', loginLimiter, loginUser);

router.get('/profile', verifyToken, getProfile);

module.exports = router;
