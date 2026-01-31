const Pool = require("pg").Pool;
require("dotenv").config();

// අපි බලනවා මේක Production ද (Vercel) නැත්නම් Development ද (Local) කියලා
const isProduction = process.env.NODE_ENV === "production";

// --- DEBUG START (මේ ටිකෙන් අපිට පෙනෙයි Connect වෙන්නේ කොහාටද කියලා) ---
console.log("---------------------------------------------");
console.log("🔍 CHECKING DATABASE CONNECTION...");
console.log("🌍 NODE_ENV:", process.env.NODE_ENV);

// Password එක හංගලා URL එක පෙන්නන්න
const dbUrl = process.env.DATABASE_URL || "⚠️ URL IS NOT SET!";
const hiddenUrl = dbUrl.replace(/:[^:/@]+@/, ":****@"); 
console.log("🔗 Connecting to:", hiddenUrl);
console.log("---------------------------------------------");
// --- DEBUG END ---

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;