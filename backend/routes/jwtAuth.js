const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization"); // 1. මේක අලුතින් එකතු කළා

// -------------------
// 1. REGISTER ROUTE
// -------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(401).send("User already exists");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, user_role) VALUES ($1, $2, $3, 'customer') RETURNING *",
      [name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token, role: newUser.rows[0].user_role });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// -------------------
// 2. LOGIN ROUTE
// -------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token, role: user.rows[0].user_role });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// -------------------
// 3. VERIFY ROUTE (මේ කොටස තමයි අඩුවෙලා තිබුනේ)
// -------------------
router.get("/is-verify", authorization, async (req, res) => {
  try {
    // Token එක valid නම් true යවනවා
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;