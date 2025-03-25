const jwt = require('jsonwebtoken');
require('dotenv').config();

const checktoken = (req, res, next) => {
  try {
    const beartoken = req.headers.authorization;
    if (!beartoken) {
      return res.status(403).json({ message: 'Not authorised' });
    }
    const token = beartoken.split(' ')[1];
    // console.log(token);

    const key = process.env.JWT_SECRET;
    const isValid = jwt.verify(token, key);
    req.user = isValid;

    next();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = checktoken;
