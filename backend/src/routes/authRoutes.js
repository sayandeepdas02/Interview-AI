const express = require('express');
const { register, login, googleLogin, getMe, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', getMe);
router.post('/logout', logout);

module.exports = router;
