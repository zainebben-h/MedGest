import pool from '../config/database.js';

const User = {
  async createUser(nom, email, password, role) {
    const [result] = await pool.query(
      "INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)",
      [nom, email, password, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM utilisateurs WHERE email = ?",
      [email]
    );
    return rows[0];
  }
};

export default User;