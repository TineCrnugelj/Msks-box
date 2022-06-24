const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

const postRegisterUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: 'Please fill all fields'});
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        return res.status(400).json({message: 'User already exists.'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        return res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        return res.status(400).json({message: 'Invalid user data'})
    }
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        return res.status(400).json({message: 'Invalid credentials'})
    }
})

const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    return res.status(200).json({
        id: _id,
        name,
        email
    });
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    postRegisterUser,
    loginUser,
    getMe,
}
