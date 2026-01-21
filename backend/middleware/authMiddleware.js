const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Check: Kya Request ke sath "Header" aya hai?
  // Standard Rule: Token hamesha 'Authorization' header mein bheja jata hai.
  // Format: "Bearer eyJhbGci..." (Bearer <space> Token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Token nikalna
      // "Bearer eyJhbG..." -> split(' ') -> ["Bearer", "eyJhbG..."] -> index [1] uthaya
      token = req.headers.authorization.split(' ')[1];

      // 3. Verification (Asal Jaadu) 🕵️‍♂️
      // jwt.verify token ko kholta hai aur check karta hai k ye hamare SECRET se sign hua hai ya nahi.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. User dhondna
      // Token k andar humne 'id' chhupayi thi (generateToken.js yaad karein)
      // Hum DB se wo User dhoond kar 'req.user' mein save kar letay hain.
      // .select('-password') ka matlab: Password field mat lana (Security).
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Agay jane do
      next();
      
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };