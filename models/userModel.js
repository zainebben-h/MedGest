const pool = require("../config/database");

const User = {
  async createUser(nom, email, password, role) {
    return await pool.query(
      "INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)",
      [nom, email, password, role]
    );
  },

  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM utilisateurs WHERE email = ?",
      [email]
    );
    return rows[0];
  }
};

module.exports = User;