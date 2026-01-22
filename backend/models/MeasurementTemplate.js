const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  // Ye template kis darzi (User) ne banaya hai?
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Kapray ka naam: e.g. "Shalwar Kameez"
  name: {
    type: String,
    required: true,
    trim: true
  },
  // Fields ki list: e.g. ["Length", "Chest", "Waist", "Tera"]
  fields: [{
    type: String,
    required: true
  }]
}, { timestamps: true });

// Constraint: Aik user aik hi naam k 2 template nahi bana sakta
templateSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('MeasurementTemplate', templateSchema);