const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const locked = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({message: 'No token'});

    jwt.verify(token, process.env.JWT_SECRET, (err, task) => {
        if (err) return res.status(403).json(err);
        req.task = task;
        next();
    })
});

module.exports = {locked}
