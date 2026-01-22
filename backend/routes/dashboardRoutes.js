const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Sirf login wala banda hi dashboard dekh sakta hai
router.get('/', protect, getDashboardStats);

module.exports = router;