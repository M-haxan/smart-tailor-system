const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  // 1. Kharche ka Naam (e.g. "Bijli ka Bill", "Chaye Pani", "Ali ki Salary")
  title: {
    type: String,
    required: true,
    trim: true
  },

  // 2. Kitne Paise lagay?
  amount: {
    type: Number,
    required: true
  },

  // 3. Category (Report k liye zaroori hai)
  category: {
    type: String,
    enum: [
      'Rent',           // Dukan ka Kiraya
      'Utilities',      // Bijli/Internet Bill
      'Salary',         // Karigar/Worker ke paisay
      'Material',       // Bukram, Dhaga, Button
      'Food',           // Chaye Roti
      'Maintenance',    // Machine kharab ho gai etc
      'Other'           // Deegar
    ],
    required: true
  },

  // 4. Kab kharcha hua? (Default: Abhi)
  date: {
    type: Date,
    default: Date.now
  },

  // 5. Kis ne entry ki? (Audit Trail)
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  notes: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);