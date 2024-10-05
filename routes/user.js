const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUserRegistration } = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/userController');
const loginLimiter = require('../middleware/rateLimitMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', loginLimiter, loginUser);

router.get('/profile', authMiddleware, getProfile);

module.exports = router;
