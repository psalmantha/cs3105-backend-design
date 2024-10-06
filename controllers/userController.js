require('dotenv').config();
const { createUser, verifyPassword, findUser, findUserById } = require('../models/userModel');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    createUser(email, username, password);
    return res.status(201).json({ message: 'User registered successfully', user: { username, email } });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = findUser(email);
    if (!user || !verifyPassword(email, password)) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
};

const getProfile = (req, res) => {
    const userId = req.user.id; 
    const user = findUserById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
};

module.exports = { registerUser, loginUser, getProfile };
