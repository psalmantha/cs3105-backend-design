const express = require('express');
const userRoutes = require('./routes/user');
const rateLimit = require('./middleware/rateLimitMiddleware');

const app = express();
app.use(express.json());
app.use(rateLimit);

app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
