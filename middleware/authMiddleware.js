const { findUser } = require('../models/userModel');

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

module.exports = { validateUserRegistration };
