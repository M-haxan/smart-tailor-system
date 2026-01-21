const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    // 1. Basic Identity
    name: {
        type: String,
        required: true,
        trim: true // "  Ali  " ko "Ali" bana dega (Spaces hata dega)
    },
    
    // 2. The Unique ID (Phone Number)
    // Tailor shop mein Phone Number hi sab kuch hota hai.
    phone: {
        type: String,
        required: true,
        unique: true, // Aik number par 2 customers nahi ho sakte
    },

    // 3. Optional Info
    address: {
        type: String,
        default: "" // Lazmi nahi ke har customer address likhwaye
    },

    // 4. City (SaaS feature)
    // Agar future mein analytics chahiye k "Kis sheher se zyada customers aatay hain"
    city: {
        type: String,
        default: "Multan" 
    }

}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);