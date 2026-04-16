import pool from '../config/database.js';

const Salle = {
  async create(nom, type, capacite) {
    const [result] = await pool.query(
      'INSERT INTO salles (nom, type, capacite) VALUES (?, ?, ?)',
      [nom, type, capacite]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.query('SELECT * FROM salles');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM salles WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, updates) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE salles SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async delete(id) {
    await pool.query('DELETE FROM salles WHERE id = ?', [id]);
  }
};

export default Salle;