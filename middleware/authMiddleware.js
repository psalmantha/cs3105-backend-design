const { findUser, findUserById } = require('../models/userModel');
const { verifyToken } = require('../utils/tokenUtils');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const user = findUserById(decodedToken.id);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }

    req.user = user;

    next();
};

const validateUserRegistration = (req, res, next) => {
    const { username, email, password } = req.body;
    const errors = [];

    if (!username || !email || !password) {
        errors.push('All fields (username, email, password) are required.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push('Invalid email format.');
    }

    if (username && username.length < 3) {
        errors.push('Username must be at least 3 characters long.');
    }

    if (password && password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    if (findUser(email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    next();
};

module.exports = { validateUserRegistration, authenticateToken };
