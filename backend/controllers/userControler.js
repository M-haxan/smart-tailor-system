const User = require('../models/User'); // Model mangwaya taake DB se baat kar saken
const generateToken = require('../utils/generateToken');

// @desc    Register a new user (Admin/Worker)
// @route   POST /api/users/register
// @access  Public (Filhal public hai, baad mein admin-only kar denge)
const registerUser = async (req, res) => {
  try {
    // 1. Data Receive karna (Frontend/Postman se)
    // Hum "destructuring" use kar rahay hain taake baar baar req.body.name na likhna pare
    const { name, phone, password, role, wageSettings } = req.body;

    // 2. Validation: Kya user pehle se mojood hai?
    // Hum Phone number check karenge kyunki wo unique hai
    const userExists = await User.findOne({ phone });

    if (userExists) {
      // 400 = Bad Request (Client ki ghalti)
      return res.status(400).json({ message: 'User already exists with this phone number' });
    }

    // 3. Create User (Ye line DB mein naya record banayegi)
    // Note: Hum yahan password hash nahi kar rahay, kyunki User Model ka "pre-save" hook wo khud kar lega!
    const user = await User.create({
      name,
      phone,
      password,
      role,
      wageSettings // Agar worker hai to ye data bhi save hoga
    });

    // 4. Response (Kamyabi ka message)
    if (user) {
      // 201 = Created Successfully
      res.status(201).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        message: "Registration Successful! ✅"
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    // Agar server crash ho ya DB down ho
    res.status(500).json({ message: error.message });
  }
};
// login function bhi yahan add kar dete hain
const authUser = async (req, res) => {
  const { phone, password } = req.body;

  // 1. User dhoondo
  const user = await User.findOne({ phone });

  // 2. Check: Kya User mila? AUR Kya Password match hua?
  // user.matchPassword wahi function hai jo humne Model mein banaya tha
  if (user && (await user.matchPassword(password))) {
    
    // 3. Kamyabi! Token wapis bhejo
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id), // <--- Ye rahi Stamp! 🎫
    });

  } else {
    res.status(401).json({ message: 'Invalid Phone or Password' });
  }
};
module.exports = { registerUser, authUser };