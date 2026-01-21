const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Jab koi is URL par POST request karega, to registerUser function chalega
router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, (req, res) => {
    res.send(req.user); // Agar token sahi hai to User ka data wapis milega
});
module.exports = router;