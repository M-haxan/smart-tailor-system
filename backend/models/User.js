const mongoose = require('mongoose'); // 1. Mongoose Import (MongoDB k sath interact karne k liye)
const bcrypt = require('bcryptjs');
// 2. Schema Definition (Structure of User Document)
const userSchema = new mongoose.Schema(
  {
    // --- BASIC INFO ---
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //ROLE MANAGEMENT
    role: {
      type: String,
      enum: ['admin', 'worker'],
      default: 'worker',
    },
    wageSettings: {
      baseRate: {
        type: Number,
        default: 0
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
    }
  },
  // 3. Schema Options
  {
    timestamps: true // CreatedAt aur UpdatedAt fields automatically add kar dega
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