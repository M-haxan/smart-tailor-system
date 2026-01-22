const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // 1. Order ID (Dukaan ke liye)
  // MongoDB ki _id lambi hoti hai, hum aik chota Order Number rakhnge (e.g., Order #101)
  orderNumber: {
    type: Number,
    required: true,
    unique: true
  },

  // 2. Customer Link
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },

  // 3. Measurement Link (Zaroori Point) 📏
  // Hum us specific Measurement ID ko link karenge jo is order k liye li gayi thi.
  measurement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measurement',
    required: true
  },

  // 4. Order Details
  clothType: { type: String, required: true }, // e.g., Shalwar Kameez
  quantity: { type: Number, default: 1 },
  deliveryDate: { type: Date, required: true },
  
  // 5. Status Tracking (Workflow) 🚦
  status: {
    type: String,
    enum: ['Pending', 'Cutting', 'Stitching', 'Ready', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },

  // 6. Worker Assignment (Kis Karigar k paas hai?) 🧵
  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Worker bhi 'User' table mein hi hai
    default: null // Shuru mein shayad kisi ko assign na ho
  },

  // 7. Financials (Hisaab) 💰
  amount: {
    total: { type: Number, required: true },
    advance: { type: Number, default: 0 },
    balance: { type: Number, default: 0 } // (Total - Advance)
  },

  // 8. Special Instructions
  urgent: { type: Boolean, default: false } // Agar jaldi chahiye ho

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);