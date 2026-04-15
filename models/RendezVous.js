// File: models/RendezVous.js
import pool from '../config/database.js';

const RendezVous = {
  // Create a new appointment
  async createRdv(patient_id, medecin_id, salle_id, date_rdv, motif, statut = 'planifie') {
    const [result] = await pool.query(
      "INSERT INTO rendezvous (patient_id, medecin_id, salle_id, date_rdv, motif, statut) VALUES (?, ?, ?, ?, ?, ?)",
      [patient_id, medecin_id, salle_id, date_rdv, motif, statut]
    );
    return result.insertId;
  },

  // Get all appointments
  async getAllRdv() {
    const [rows] = await pool.query(`
      SELECT
        r.id,
        r.patient_id,
        r.medecin_id,
        r.salle_id,
        r.date_rdv,
        r.motif,
        r.statut,
        u_patient.nom AS patient_nom,
        u_medecin.nom AS medecin_nom,
        s.nom AS salle_nom
      FROM rendezvous r
      JOIN patients p ON r.patient_id = p.id
      JOIN utilisateurs u_patient ON p.utilisateur_id = u_patient.id
      LEFT JOIN medecins m ON r.medecin_id = m.id
      LEFT JOIN utilisateurs u_medecin ON m.utilisateur_id = u_medecin.id
      JOIN salles s ON r.salle_id = s.id
    `);
    return rows;
  },

  // Get appointments by patient
  async getByPatient(patient_id) {
    const [rows] = await pool.query(`
      SELECT r.id, r.patient_id, r.medecin_id, r.salle_id, r.date_rdv, r.motif, r.statut,
             pe.nom as medecin_nom, s.nom as salle_nom
      FROM rendezvous r
      LEFT JOIN medecins pe ON r.medecin_id = pe.id
      LEFT JOIN salles s ON r.salle_id = s.id
      WHERE r.patient_id = ?
    `, [patient_id]);
    return rows;
  },

  // Update appointment status
  async updateRdv(id, data) {
    await pool.query(
      "UPDATE rendezvous SET ? WHERE id = ?",
      [data, id]
    );
  },

  // Search appointments by patient name
  async searchByPatient(query) {
    const [rows] = await pool.query(`
      SELECT r.id, r.patient_id, r.medecin_id, r.salle_id, r.date_rdv, r.motif, r.statut,
             p.nom as patient_nom, pe.nom as medecin_nom, s.nom as salle_nom
      FROM rendezvous r
      LEFT JOIN patients p ON r.patient_id = p.id
      LEFT JOIN medecins pe ON r.medecin_id = pe.id
      LEFT JOIN salles s ON r.salle_id = s.id
      WHERE p.nom LIKE ? OR pe.nom LIKE ?
    `, [`%${query}%`, `%${query}%`]);
    return rows;
  }
};

export default RendezVous;