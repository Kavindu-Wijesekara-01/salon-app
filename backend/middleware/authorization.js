const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // 1. Header එකෙන් Token එක ගැනීම
    const jwtToken = req.header("token");

    // 2. Token එකක් නැත්නම් Error එකක් යැවීම
    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }

    // 3. Token එක Verify කිරීම
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // 4. User ID එක Request එකට එකතු කිරීම
    req.user = payload.user;
    
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorize");
  }
};