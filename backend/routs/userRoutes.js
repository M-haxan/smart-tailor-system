const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userControler');

// Jab koi is URL par POST request karega, to registerUser function chalega
router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;