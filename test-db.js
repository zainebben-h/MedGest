const pool = require("./config/database");

async function test() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("DB Connected ✔", rows);
  } catch (err) {
    console.error("DB Error ❌", err);
  }
}

test();