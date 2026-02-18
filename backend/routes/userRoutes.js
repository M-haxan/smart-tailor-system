const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getMe, 
  getAllUsers, // ✅ Import
  deleteUser   // ✅ Import
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// ✅ Naye Routes (Sirf Login wala banda hi dekh sake)
router.get('/', protect, getAllUsers);
router.delete('/:id', protect, deleteUser);

module.exports = router;