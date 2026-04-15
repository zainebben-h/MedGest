// File: routes/rdvRoutes.js
import express from 'express';
import { authenticateToken, checkRole } from '../middleware/auth.js';
import RendezVous from '../models/RendezVous.js';

const router = express.Router();

// Create a new appointment (US2)
router.post('/', authenticateToken, checkRole(['patient', 'secretaire']), async (req, res) => {
  const { patient_id, medecin_id, salle_id, date_rdv, motif } = req.body;
  const rdv_id = await RendezVous.createRdv(patient_id, medecin_id, salle_id, date_rdv, motif);
  res.status(201).json({ rdv_id });
});

// Get all appointments (US5)
router.get('/', authenticateToken, async (req, res) => {
  const rdvs = await RendezVous.getAllRdv();
  res.json(rdvs);
});

// Get appointments by patient
router.get('/patient/:id', authenticateToken, async (req, res) => {
  const rdvs = await RendezVous.getByPatient(req.params.id);
  res.json(rdvs);
});

// Update appointment status (US5 - cancel/confirm)
router.put('/:id', authenticateToken, checkRole(['secretaire', 'medecin']), async (req, res) => {
  await RendezVous.updateRdv(req.params.id, req.body);
  res.json({ message: "Appointment updated" });
});

// Search appointments
router.get('/search/:query', authenticateToken, async (req, res) => {
  const rdvs = await RendezVous.searchByPatient(req.params.query);
  res.json(rdvs);
});

export default router;