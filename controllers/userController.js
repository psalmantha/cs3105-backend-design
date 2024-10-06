const { createUser, verifyPassword, findUser, findUserById } = require('../models/userModel');
const jwt = require('jsonwebtoken');

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

    if (!verifyPassword(email, password)) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = findUser(email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user.id }, '0x11!$#', { expiresIn: '1h' });

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
