const express = require('express');
const router = express.Router();
const { addExpense, getFinancialReport } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addExpense); // Kharcha likho
router.get('/report', protect, getFinancialReport); // Hisaab dekho

module.exports = router;