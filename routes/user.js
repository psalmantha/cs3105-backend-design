const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUserRegistration } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', loginUser);

module.exports = router;
