import pool from '../config/database.js';

const Medecin = {
  async create(utilisateur_id, specialite) {
    const [result] = await pool.query(
      'INSERT INTO medecins (utilisateur_id, specialite) VALUES (?, ?)',
      [utilisateur_id, specialite]
    );
    return result.insertId;
  },
  async findByUserId(utilisateur_id) {
    const [rows] = await pool.query('SELECT * FROM medecins WHERE utilisateur_id = ?', [utilisateur_id]);
    return rows[0];
  },
  async findAll() {
    const [rows] = await pool.query(`
      SELECT m.*, u.nom, u.email, u.role 
      FROM medecins m 
      JOIN utilisateurs u ON m.utilisateur_id = u.id
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(`
      SELECT m.*, u.nom, u.email, u.role 
      FROM medecins m 
      JOIN utilisateurs u ON m.utilisateur_id = u.id 
      WHERE m.id = ?
    `, [id]);
    return rows[0];
  },

  async findBySpecialite(specialite) {
    const [rows] = await pool.query(`
      SELECT m.*, u.nom 
      FROM medecins m 
      JOIN utilisateurs u ON m.utilisateur_id = u.id 
      WHERE m.specialite = ?
    `, [specialite]);
    return rows;
  },

  async update(id, updates) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE medecins SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async delete(id) {
    await pool.query('DELETE FROM medecins WHERE id = ?', [id]);
  }
};

export default Medecin;