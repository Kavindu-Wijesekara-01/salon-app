const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  };
  
  // පැයක් ඇතුලත මේ Token එක කල් ඉකුත් වෙනවා (Expire වෙනවා)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "20h" });
}

module.exports = jwtGenerator;