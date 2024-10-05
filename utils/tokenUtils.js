const jwt = require('jsonwebtoken');
const secretKey = '0x11!$#'; 

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { verifyToken };
