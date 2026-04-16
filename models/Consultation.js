import pool from '../config/database.js';

const Consultation = {
  async create(rendezvous_id, diagnostic, observations) {
    const [result] = await pool.query(
      'INSERT INTO consultations (rendezvous_id, diagnostic, observations) VALUES (?, ?, ?)',
      [rendezvous_id, diagnostic, observations]
    );
    return result.insertId;
  },

  async addPrescription(consultation_id, medicament, dosage, duree) {
    const [result] = await pool.query(
      'INSERT INTO prescriptions (consultation_id, medicament, dosage, duree) VALUES (?, ?, ?, ?)',
      [consultation_id, medicament, dosage, duree]
    );
    return result.insertId;
  },

  async findByRendezvous(rendezvous_id) {
    const [rows] = await pool.query(`
      SELECT c.*, p.nom as patient_nom, pe.nom as medecin_nom
      FROM consultations c
      JOIN rendezvous r ON c.rendezvous_id = r.id
      JOIN patients pat ON r.patient_id = pat.id
      JOIN utilisateurs p ON pat.utilisateur_id = p.id
      JOIN personnel per ON r.personnel_id = per.id
      JOIN utilisateurs pe ON per.utilisateur_id = pe.id
      WHERE c.rendezvous_id = ?
    `, [rendezvous_id]);
    return rows[0];
  },

  async getPrescriptions(consultation_id) {
    const [rows] = await pool.query(
      'SELECT * FROM prescriptions WHERE consultation_id = ?',
      [consultation_id]
    );
    return rows;
  }
};

export default Consultation;