const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // 1. Header එකෙන් Token එක ගන්නවා
    const jwtToken = req.header("token");

    // Token එක නැත්නම් Error එකක් යවනවා
    if (!jwtToken) {
      console.log("🚫 Auth Middleware: No Token Found in Header");
      return res.status(403).json("Not Authorize");
    }

    // 2. Token එක ඇත්තද කියලා බලනවා (Verify)
    // වැදගත්: මෙතන process.env.JWT_SECRET හරියටම තියෙන්න ඕන
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;
    console.log("✅ Auth Middleware: Token Verified Successfully!");
    
    next(); // ඊළඟ පියවරට යන්න

  } catch (err) {
    console.error("💥 Auth Middleware Error:", err.message);
    return res.status(403).json("Not Authorize");
  }
};