const mongoose = require('mongoose'); // 1. Mongoose library mangwayi
const bcrypt = require('bcryptjs');

// 2. Schema Definition (Ye Data ka Naqsha/Blueprint hai)
const userSchema = new mongoose.Schema(
  {
    // --- BASIC INFO ---
    name: {
      type: String,     // Data type text hoga
      required: true,   // Iske baghair save nahi hoga (Validation)
    },
    
    phone: {
      type: String,
      required: true,
      unique: true,     // Indexing: Pura DB check hoga k ye number duplicate to nahi
    },
    
    password: {
      type: String,
      required: true,
      // Note: Asal password kabhi save nahi karte, hum usay Hash (Encrypt) karke rakhenge.
      // e.g., "123456" ban jayega "$2b$10$Xyz..."
    },

    // --- ROLE MANAGEMENT (Bohat Zaroori) ---
    role: {
      type: String,
      enum: ['admin', 'worker'], // Validation: Sirf ye 2 values allowed hain
      default: 'worker',         // Agar kuch na bheja jaye to khud ba khud worker bana do
    },

    // --- WORKER SPECIFIC DATA (Nested Object) ---
    // Ye data sirf tab kaam ayega jab role 'worker' ho
    wageSettings: {
      baseRate: {
        type: Number,   // Paise hamesha Number hotay hain (Maths k liye)
        default: 0      // Shuru mein 0
      },
      commissionPercentage: {
        type: Number,
        default: 0
      }
    },

    // --- LEDGER / HISAAB ---
    currentBalance: {
      type: Number,
      default: 0
      // Logic: 
      // Positive (+5000) = Shop ne Worker ko dene hain (Salary pending)
      // Negative (-2000) = Worker ne Advance liya hua hai
    }
  },
  
  // 3. Schema Options
  {
    timestamps: true 
    // Ye Mongoose ka jadoo hai. Ye khud ba khud 2 fields add kar dega:
    // createdAt: "2024-01-12T10:00:00Z" (Record kab bana)
    // updatedAt: "2024-01-15T12:00:00Z" (Aakhri baar kab change hua)
  }
);
// --- 🔒 PASSWORD HASHING MIDDLEWARE ---

// .pre('save') ka matlab: Save hone se "Pehle" ye function chalana
userSchema.pre('save', async function (next) {
  
  // 2. Check: Kya password change hua hai?
  // Agar user ne sirf "Name" update kiya hai, to password ko dobara hash mat karo.
  // Agar dobara hash kiya to user login nahi kar payega.
  if (!this.isModified('password')) {
    next(); // Agay barh jao, kuch mat karo
  }

  // 3. Salt Generate karna (Encryption ki taqat)
  // 10 rounds ka matlab hai algorithm 10 baar chalega (Standard security)
  const salt = await bcrypt.genSalt(10);

  // 4. Asal Hashing
  // 'this.password' (plain text) ko 'salt' k sath mila kr hash bana do
  this.password = await bcrypt.hash(this.password, salt);
  
  // Ab save hone do
});


// --- 🔑 PASSWORD COMPARISON METHOD ---

// Ye method hum Login Controller mein use karenge.
// Kyunki hum password wapis decrypt nahi kar sakte, hum user k "Entered Password"
// ko hash karke DB wale hash se match karte hain.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// 4. Model Export
// 'User' wo naam hai jis se MongoDB collection banayega (Users)
module.exports = mongoose.model('User', userSchema);