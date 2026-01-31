const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

// -------------------
// 1. REGISTER ROUTE (DEBUG VERSION)
// -------------------
router.post("/register", async (req, res) => {
  try {
    console.log("🟢 1. Register Request Received");
    console.log("🔍 Checking JWT_SECRET:", process.env.JWT_SECRET ? "Exists ✅" : "MISSING ❌");

    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      console.log("⚠️ User already exists");
      return res.status(401).send("User already exists");
    }

    console.log("🟢 2. User not found (Good), Hashing password...");
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    console.log("🟢 3. Inserting to DB...");
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, user_role) VALUES ($1, $2, $3, 'customer') RETURNING *",
      [name, email, bcryptPassword]
    );

    console.log("🟢 4. DB Insert Success. Generating Token...");
    const token = jwtGenerator(newUser.rows[0].user_id);
    
    console.log("✅ 5. Token Generated. Sending Response.");
    res.json({ token, role: newUser.rows[0].user_role });

  } catch (err) {
    console.error("💥 REGISTER CRASH:", err.message); // Error එක මෙතන වැටෙයි
    res.status(500).send("Server Error: " + err.message);
  }
});

// -------------------
// 2. LOGIN ROUTE (DEBUG VERSION)
// -------------------
router.post("/login", async (req, res) => {
  try {
    console.log("🔵 1. Login Request Received");
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      console.log("⚠️ User not found in DB");
      return res.status(401).json("Password or Email is incorrect");
    }

    console.log("🔵 2. Checking Password...");
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      console.log("⚠️ Password Wrong");
      return res.status(401).json("Password or Email is incorrect");
    }

    console.log("🔵 3. Password Correct. Generating Token...");
    const token = jwtGenerator(user.rows[0].user_id);
    
    console.log("✅ 4. Token Generated. Success!");
    res.json({ token, role: user.rows[0].user_role });

  } catch (err) {
    console.error("💥 LOGIN CRASH:", err.message); // Error එක මෙතන වැටෙයි
    res.status(500).send("Server Error: " + err.message);
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;