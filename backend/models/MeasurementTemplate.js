const mongoose = require('mongoose');
const templateSchema = new mongoose.Schema({
  // 1. Template kis user (Tailor) ka hai?
  // Har darzi ka apna style hota hai. Koi "Tera" naapta hai, koi nahi.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // 2. Kapray ka Naam (e.g., "Shalwar Kameez", "Pant Coat")
  name: {
    type: String,
    required: true,
    trim: true
  },

  // 3. Fields ki List (Sawalaat) 📝
  // Example: ["Length", "Chest", "Waist", "Sleeves", "Collar"]
  fields: [{
    type: String,
    required: true
  }]

}, { timestamps: true });

// Constraint: Aik user aik hi naam k 2 template na bana sake
// (e.g., Ali "Shalwar Kameez" ka sirf aik hi template rakh sakta hai)
templateSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('MeasurementTemplate', templateSchema);