const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/auth');

const ctrlUsers = require('../controllers/users');

router.post('/users/register', ctrlUsers.postRegisterUser);

router.post('/users/login', ctrlUsers.loginUser);

router.get('/users/me', protect, ctrlUsers.getMe); 

module.exports = router;  