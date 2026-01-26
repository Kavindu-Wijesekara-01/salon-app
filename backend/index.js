const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// ROUTES //
app.use("/services", require("./routes/services"));
app.use("/appointments", require("./routes/appointments"));
app.use("/reviews", require("./routes/reviews"));

// Register සහ Login සඳහා route එක
app.use("/auth", require("./routes/jwtAuth"));

// Test Route
app.get("/", (req, res) => {
    res.send("Salon Server is Working!");
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;