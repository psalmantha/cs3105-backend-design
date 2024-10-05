const { createUser, verifyPassword } = require('../models/userModel');

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

    const token = `mock-token-${email}`;
    return res.status(200).json({ message: 'Login successful', token });
};

module.exports = { registerUser, loginUser };
