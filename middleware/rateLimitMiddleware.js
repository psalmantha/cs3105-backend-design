const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    message: {
        message: 'Too many login attempts. Please try again later.'
    },
    handler: (req, res) => {
        console.log(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).send({
            message: 'You have exceeded the login attempt limit. Please try again later.'
        });
    }
});

module.exports = loginLimiter;
