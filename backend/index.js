const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); // db.js එක import කිරීම

// --- MIDDLEWARE ---
app.use(cors()); // Frontend එකට සම්බන්ධ වීමට ඉඩ දීම
app.use(express.json()); // JSON දත්ත කියවීමට (req.body)

// --- ROUTES (ඔයාගේ Route ෆයිල් වල නම් හරියට බලන්න) ---

// 1. Authentication (Register/Login)
// ඔයාගේ ෆයිල් එකේ නම "jwtAuth.js" හෝ "auth.js" නම් ඒ නම මෙතනට දාන්න
app.use("/auth", require("./routes/jwtAuth")); 

// 2. Appointments / Dashboard
app.use("/appointments", require("./routes/appointments"));

// 3. Services (සේවාවන් ලබා ගැනීම)
app.use("/services", require("./routes/services"));

// 4. Reviews (Customer Feedbacks)
app.use("/reviews", require("./routes/reviews"));
app.use("/auth", require("./routes/forgotPassword"));


// --- TEST ROUTE ---
// මේකෙන් අපිට බලාගන්න පුළුවන් Server එක වැඩද කියලා
app.get("/", (req, res) => {
    res.json({ message: "BlinkBeat Server is Running Successfully!" });
});


// --- SERVER STARTUP (VERCEL COMPATIBLE) ---
// Vercel වලදී Server එක දිගටම දුවන්නේ නැති නිසා මේ කොටස වැදගත්

const PORT = process.env.PORT || 5000;

// Local එකේ වැඩ කරනකොට Server එක Start කරන්න
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Vercel සඳහා export කිරීම (අනිවාර්යයි)
module.exports = app;