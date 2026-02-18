const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// 1. REGISTER USER
// @route POST /api/users
const registerUser = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      phone,
      password,
      role
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. LOGIN USER
// @route POST /api/users/login
const loginUser = async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid Phone or Password' });
  }
};

// 3. GET CURRENT USER (ME)
// @route GET /api/users/me
const getMe = async (req, res) => {
  // Middleware se user already req.user mein set hota hai
  res.status(200).json(req.user);
};

// 4. GET ALL USERS (For Staff Page)
// @route GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Password hata kar bhejo
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. DELETE USER (For Staff Page)
// @route DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed', id: req.params.id });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ EXPORTS (Make sure names match exactly with Routes)
module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  deleteUser,
};