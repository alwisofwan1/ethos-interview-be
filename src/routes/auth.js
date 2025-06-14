const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const verifyToken = require('../config/jwt');

router.post('/auth/register', authController.registerUser);

router.post('/auth/login', authController.loginUser);

router.post('/auth/verify-otp', verifyToken, authController.verifyOtp);

router.post('/auth/resend-otp', verifyToken, authController.resendOtp);

module.exports = router;
