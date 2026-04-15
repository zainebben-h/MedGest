// File: models/Patient.js
import pool from '../config/database.js';

const Patient = {
  // Create a new patient (linked to a user)
  async createPatient(utilisateur_id, date_naissance, telephone, adresse = '') {
    const [result] = await pool.query(
      "INSERT INTO patients (utilisateur_id, date_naissance, telephone, adresse) VALUES (?, ?, ?, ?)",
      [utilisateur_id, date_naissance, telephone, adresse]
    );
    return result.insertId;
  },

  // Get all patients
  async getAllPatients() {
    const [rows] = await pool.query(`
      SELECT u.id, u.nom, u.email, p.id as patient_id, p.date_naissance, p.telephone, p.adresse, p.statut
      FROM utilisateurs u
      JOIN patients p ON u.id = p.utilisateur_id
    `);
    return rows;
  },

  // Get a single patient by ID
  async getPatientById(patient_id) {
    const [rows] = await pool.query(`
      SELECT u.id, u.nom, u.email, p.date_naissance, p.telephone, p.adresse, p.statut
      FROM utilisateurs u
      JOIN patients p ON u.id = p.utilisateur_id
      WHERE p.id = ?
    `, [patient_id]);
    return rows[0];
  },

  // Update patient info
  async updatePatient(patient_id, data) {
    await pool.query(
      "UPDATE patients SET ? WHERE id = ?",
      [data, patient_id]
    );
  },

  // Search patients by name or ID
  async searchPatients(query) {
    const [rows] = await pool.query(`
      SELECT u.id, u.nom, u.email, p.id as patient_id, p.date_naissance, p.telephone, p.adresse, p.statut
      FROM utilisateurs u
      JOIN patients p ON u.id = p.utilisateur_id
      WHERE u.nom LIKE ? OR p.id LIKE ?
    `, [`%${query}%`, `%${query}%`]);
    return rows;
  }
};

export default Patient;