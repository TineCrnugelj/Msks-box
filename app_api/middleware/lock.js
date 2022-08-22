const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Task = require('../models/Run');

const locked = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.lockedRun = Task.findById(decoded.id);
            next();
        }
        catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401).json({message: 'Task not locked, no token'});
    }
});

module.exports = {locked}
