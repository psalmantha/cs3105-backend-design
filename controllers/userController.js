// where business logic for user reg is implemented
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password
  };

  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'User Registration Sucsessful', user: newUser });
};

module.exports = { registerUser };
