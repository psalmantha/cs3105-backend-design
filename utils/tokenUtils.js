const jwt = require('jsonwebtoken');
const secretKey = '0x11!$#';

const signToken = (userId) => {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

module.exports = { signToken, verifyToken };
