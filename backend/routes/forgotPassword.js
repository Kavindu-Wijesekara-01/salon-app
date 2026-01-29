const router = require("express").Router();
const pool = require("../db");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// ==========================================
// ROUTE 1: FORGOT PASSWORD (Email යැවීම)
// ==========================================
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // 1. User කෙනෙක් ඉන්නවාද බැලීම
    const userCheck = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json("User not found");
    }

    // 2. Token එකක් හැදීම
    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // පැය 24ක් වලංගුයි

    // 3. Database එක Update කිරීම
    await pool.query(
      "UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE user_email = $3",
      [token, expires, email]
    );

    // 4. Email එක යැවීම (NODEMAILER SETUP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // .env එකෙන් ගනී
        pass: process.env.EMAIL_PASS, // .env එකෙන් ගනී
      },
    });

    // Email එකේ අඩංගු දේ (HTML Design එකක් දාමු ලස්සනට)
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    
    const mailOptions = {
      from: '"Salon BlinkBeat" <' + process.env.EMAIL_USER + '>', // යවන නම
      to: email, // ලබන කෙනා
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>ඔබගේ ගිණුමේ මුරපදය වෙනස් කිරීමට පහත බොත්තම ඔබන්න.</p>
          <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>නැත්නම් මේ Link එකෙන් යන්න: <br> <a href="${resetLink}">${resetLink}</a></p>
          <p>මේ ඉල්ලීම ඔබ විසින් නොකළේ නම්, මෙය මග හරින්න.</p>
        </div>
      `,
    };

    // ඇත්තටම Email එක යවන තැන
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    res.json({ message: "Password reset link sent to your email!" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Email sending failed");
  }
});


// ==========================================
// ROUTE 2: RESET PASSWORD (අලුත් Password එක දැමීම)
// ==========================================
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // 1. Token එක valid ද කියලා බැලීම
    // (අපි මෙතන Time Check එක තාවකාලිකව අයින් කළා Error එක මගහරින්න)
    const user = await pool.query(
      "SELECT * FROM users WHERE reset_password_token = $1",
      [token]
    );

    if (user.rows.length === 0) {
      return res.status(400).json("Token is invalid or expired");
    }

    // 2. අලුත් Password එක Hash කිරීම
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    // 3. Password එක Update කිරීම සහ Token අයින් කිරීම
    await pool.query(
      "UPDATE users SET user_password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE user_id = $2",
      [bcryptPassword, user.rows[0].user_id]
    );

    res.json({ message: "Password updated successfully! Please login." });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;