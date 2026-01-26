const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  // කෙලින්ම Connection String එක Environment Variable එකෙන් ගන්නවා
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Cloud DB නිසා SSL අවශ්‍යයි
  }
});

module.exports = pool;