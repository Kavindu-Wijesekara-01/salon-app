const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// 1. CREATE APPOINTMENT
router.post("/", authorization, async (req, res) => {
  try {
    // name සහ contact අලුතින් එකතු කළා
    const { service_name, date, time, email, name, contact } = req.body;

    // Double Booking Check (වෙනසක් නෑ)
    const checkAvailability = await pool.query(
      "SELECT * FROM appointments WHERE appointment_date = $1 AND appointment_time = $2 AND status != 'Cancelled'",
      [date, time]
    );

    if (checkAvailability.rows.length > 0) {
      return res.status(400).json("This time slot is already booked!");
    }

    // Insert Appointment (අලුත් තීරු එක්ක)
    const newAppointment = await pool.query(
      "INSERT INTO appointments (user_id, user_email, service_name, appointment_date, appointment_time, user_name, user_contact) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [req.user, email, service_name, date, time, name, contact]
    );

    res.json(newAppointment.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 2. GET ALL APPOINTMENTS (Admin Only)
router.get("/all", authorization, async (req, res) => {
  try {
    // Admin check logic එක මෙතනත් දාන්න පුළුවන් අවශ්‍ය නම්
    console.log("Data Received:", req.body);
    const allAppointments = await pool.query(
      "SELECT * FROM appointments ORDER BY appointment_date DESC, appointment_time ASC"
    );
    res.json(allAppointments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 3. UPDATE STATUS (Admin Only - Confirm/Cancel)
router.put("/status/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Confirmed' or 'Cancelled'

    const updateStatus = await pool.query(
      "UPDATE appointments SET status = $1 WHERE appointment_id = $2 RETURNING *",
      [status, id]
    );

    res.json("Appointment status updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;