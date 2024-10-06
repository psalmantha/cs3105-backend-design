let users = [];

const createUser = (email, username, password) => {
    const newUser = {
        id: users.length + 1,
        email,
        username,
        password
    };
    users.push(newUser);
};

const findUser = (email) => {
    return users.find(user => user.email === email);
};

const findUserById = (id) => {
    return users.find(user => user.id === id);
};

const verifyPassword = (email, password) => {
    const user = findUser(email);
    return user && user.password === password;
};

module.exports = {
    createUser,
    findUser,
    verifyPassword,
    findUserById
};
