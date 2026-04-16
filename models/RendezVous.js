import pool from '../config/database.js';

const RendezVous = {
  async create(patient_id, medecin_id, salle_id, date_rdv, motif, statut = 'planifie') {
    const [result] = await pool.query(
      'INSERT INTO rendezvous (patient_id, medecin_id, salle_id, date_rdv, motif, statut) VALUES (?, ?, ?, ?, ?, ?)',
      [patient_id, medecin_id, salle_id, date_rdv, motif, statut]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.query(`
      SELECT r.*, 
             u_patient.nom as patient_nom,
             u_medecin.nom as medecin_nom,
             s.nom as salle_nom
      FROM rendezvous r
      JOIN patients p ON r.patient_id = p.id
      JOIN utilisateurs u_patient ON p.utilisateur_id = u_patient.id
      LEFT JOIN medecins m ON r.medecin_id = m.id
      LEFT JOIN utilisateurs u_medecin ON m.utilisateur_id = u_medecin.id
      LEFT JOIN salles s ON r.salle_id = s.id
      ORDER BY r.date_rdv DESC
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(`
      SELECT r.*, 
             u_patient.nom as patient_nom,
             u_medecin.nom as medecin_nom
      FROM rendezvous r
      JOIN patients p ON r.patient_id = p.id
      JOIN utilisateurs u_patient ON p.utilisateur_id = u_patient.id
      LEFT JOIN medecins m ON r.medecin_id = m.id
      LEFT JOIN utilisateurs u_medecin ON m.utilisateur_id = u_medecin.id
      WHERE r.id = ?
    `, [id]);
    return rows[0];
  },

  async findByPatient(patient_id) {
    const [rows] = await pool.query(`
      SELECT r.*, u.nom as medecin_nom, s.nom as salle_nom
      FROM rendezvous r
      LEFT JOIN medecins m ON r.medecin_id = m.id
      LEFT JOIN utilisateurs u ON m.utilisateur_id = u.id
      LEFT JOIN salles s ON r.salle_id = s.id
      WHERE r.patient_id = ?
      ORDER BY r.date_rdv DESC
    `, [patient_id]);
    return rows;
  },

  async findByMedecin(medecin_id) {
    const [rows] = await pool.query(`
      SELECT r.*, u.nom as patient_nom
      FROM rendezvous r
      JOIN patients p ON r.patient_id = p.id
      JOIN utilisateurs u ON p.utilisateur_id = u.id
      WHERE r.medecin_id = ?
      ORDER BY r.date_rdv DESC
    `, [medecin_id]);
    return rows;
  },

  async updateStatut(id, statut) {
    await pool.query('UPDATE rendezvous SET statut = ? WHERE id = ?', [statut, id]);
  },

  async update(id, updates) {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE rendezvous SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async delete(id) {
    await pool.query('DELETE FROM rendezvous WHERE id = ?', [id]);
  }
};

export default RendezVous;