import pool from '../config/database.js';

const Patient = {
  async create(utilisateur_id, date_naissance, telephone, adresse) {
    const [result] = await pool.query(
      'INSERT INTO patients (utilisateur_id, date_naissance, telephone, adresse) VALUES (?, ?, ?, ?)',
      [utilisateur_id, date_naissance, telephone, adresse]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.query(`
      SELECT p.*, u.nom, u.email 
      FROM patients p 
      JOIN utilisateurs u ON p.utilisateur_id = u.id
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(`
      SELECT p.*, u.nom, u.email 
      FROM patients p 
      JOIN utilisateurs u ON p.utilisateur_id = u.id 
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  },

  async findByUserId(utilisateur_id) {
    const [rows] = await pool.query('SELECT * FROM patients WHERE utilisateur_id = ?', [utilisateur_id]);
    return rows[0];
  },

  async update(id, updates) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE patients SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async delete(id) {
    await pool.query('DELETE FROM patients WHERE id = ?', [id]);
  }
};

export default Patient;