const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// 1. ADD SERVICE (Admin Only)
router.post("/", authorization, async (req, res) => {
  try {
    const { name, description, price, duration, image } = req.body;
    
    // Admin check
    const user = await pool.query("SELECT user_role FROM users WHERE user_id = $1", [req.user]);
    if (user.rows[0].user_role !== 'admin') return res.status(401).json("Access Denied");

    const newService = await pool.query(
      "INSERT INTO services (service_name, service_description, service_price, service_duration, service_image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, price, duration, image]
    );

    res.json(newService.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 2. GET ALL SERVICES (Public)
router.get("/", async (req, res) => {
  try {
    const allServices = await pool.query("SELECT * FROM services ORDER BY service_id ASC");
    res.json(allServices.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 3. UPDATE SERVICE (Admin Only) - අලුත් කොටස
router.put("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration, image } = req.body;

    // Admin check
    const user = await pool.query("SELECT user_role FROM users WHERE user_id = $1", [req.user]);
    if (user.rows[0].user_role !== 'admin') return res.status(401).json("Access Denied");

    const updateService = await pool.query(
      "UPDATE services SET service_name = $1, service_description = $2, service_price = $3, service_duration = $4, service_image = $5 WHERE service_id = $6 RETURNING *",
      [name, description, price, duration, image, id]
    );

    if (updateService.rows.length === 0) {
      return res.json("This service is not yours");
    }

    res.json("Service was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 4. DELETE SERVICE (Admin Only) - අලුත් කොටස
router.delete("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;

    // Admin check
    const user = await pool.query("SELECT user_role FROM users WHERE user_id = $1", [req.user]);
    if (user.rows[0].user_role !== 'admin') return res.status(401).json("Access Denied");

    const deleteService = await pool.query("DELETE FROM services WHERE service_id = $1", [id]);
    res.json("Service was deleted!");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;