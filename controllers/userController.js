const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateRegistration = (username, email, password) => {
  const errors = [];

  if (!username || !email || !password) {
    errors.push('All fields are required');
  }

  if (username && (username.length < 3 || username.length > 20)) {
    errors.push('Username must be between 3 and 20 characters');
  }

  if (email && !isValidEmail(email)) {
    errors.push('Invalid email format');
  }

  if (password && password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  const validationErrors = validateRegistration(username, email, password);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  let users = [];
  try {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  } catch (err) {
    console.error('Error reading users file:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  const existingUser = users.find((user) => user.email === email || user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }

  const newUser = { id: users.length + 1, username, email, password }; // where password is supposedly hashed

  users.push(newUser);

  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  return res.status(201).json({ message: 'User registered successfully', user: { username, email } });
};

module.exports = { registerUser };