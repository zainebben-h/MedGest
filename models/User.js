import pool from '../config/database.js';

const User = {
  async createUser(nom, email, password, role) {
    const [result] = await pool.query(
      'INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)',
      [nom, email, password, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM utilisateurs WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, nom, email, role, created_at FROM utilisateurs WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async updateUser(id, updates) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE utilisateurs SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async deleteUser(id) {
    await pool.query('DELETE FROM utilisateurs WHERE id = ?', [id]);
  }
};

export default User;