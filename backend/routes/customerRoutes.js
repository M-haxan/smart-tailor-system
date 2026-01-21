const express = require('express');
const router = express.Router();
const { addCustomer, searchCustomers } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware'); // Chowkidaar

// Dono routes ko Protect karo (Bina login koi customer na dekh sake)
router.route('/').post(protect, addCustomer).get(protect, searchCustomers);

module.exports = router;