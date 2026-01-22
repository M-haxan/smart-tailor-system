const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Sab routes protected hain (Login lazmi hai)
router.route('/')
  .post(protect, createOrder)  // Order Lagana
  .get(protect, getOrders);    // Orders ki List Dekhna

// Status Update karna (e.g. Pending -> Cutting)
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;