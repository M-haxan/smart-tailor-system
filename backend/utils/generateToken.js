const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // .sign ka matlab: Token banao
  // { id }: Token ke andar user ki ID chhupa do (Payload)
  // expiresIn: '30d': Ye token 30 din baad expire ho jayega (Security)
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;