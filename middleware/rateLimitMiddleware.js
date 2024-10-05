const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    message: 'Too many login attempts. Please try again later.'
});

module.exports = loginLimiter;
