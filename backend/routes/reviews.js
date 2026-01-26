const router = require("express").Router();
const pool = require("../db");

// 1. GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const allReviews = await pool.query("SELECT * FROM reviews ORDER BY review_id DESC");
    res.json(allReviews.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 2. ADD NEW REVIEW
router.post("/", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const newReview = await pool.query(
      "INSERT INTO reviews (user_name, rating, comment) VALUES ($1, $2, $3) RETURNING *",
      [name, rating, comment]
    );
    res.json(newReview.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;