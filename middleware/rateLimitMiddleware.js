const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    message: (req, res) => {
        const remainingAttempts = Math.max(0, req.rateLimit.remaining);
        return {
            message: 'Too many login attempts. Please try again later.',
            remainingAttempts,
            resetTime: new Date(Date.now() + req.rateLimit.resetTime).toLocaleTimeString()
        };
    },
    handler: (req, res) => {
        console.log(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).send({
            message: 'You have exceeded the login attempt limit. Please try again later.',
            resetTime: new Date(Date.now() + req.rateLimit.resetTime).toLocaleTimeString()
        });
    },
    onLimitReached: (req, res) => {
        console.log(`Limit reached for IP: ${req.ip}`);
    }
});

module.exports = loginLimiter;
