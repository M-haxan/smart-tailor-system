const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  // customer ka reference (Foreign Key)
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Customer model se link kiya
    required: true
  },
  // 2. Kis Type ka kapra hai?
  // Is bunyad par hum frontend par fields dikhayenge
  clothType: {
    type: String,
    // enum: ['Shalwar Kameez', 'Pant Coat', 'Waistcoat', 'Kurta Pajama'],
    required: true
  },

  // 3. Naap (Measurements) - Flexible Object 📏
  // Hum alag alag fields nahi banayenge, aik Object mein sab dalenge.
  // Example: { length: 40, chest: 22, waist: 34 }
  fittings: {
    type: Map, // 'Map' ka matlab: Isme jo marzi key-value add kar do
    of: Number // Values hamesha Number hongi (Inches mein)
  },

  // 4. Extra Notes (Example: "Side pocket lagani hai")
  notes: {
    type: String,
    default: ""
  },
  
  // 5. Voice Note URL 🎤 (Future Feature)
  // Agar master sahab bol kar batana chahein
  voiceNoteUrl: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model('Measurement', measurementSchema);