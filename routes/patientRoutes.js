// File: routes/patientRoutes.js
import express from 'express';
import { authenticateToken, checkRole } from '../middleware/auth.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// Create a new patient (US6)
router.post('/', authenticateToken, checkRole(['secretaire', 'admin']), async (req, res) => {
  const { utilisateur_id, date_naissance, telephone, adresse } = req.body;
  const patient_id = await Patient.createPatient(utilisateur_id, date_naissance, telephone, adresse);
  res.status(201).json({ patient_id });
});

// Get all patients (US4)
router.get('/', authenticateToken, checkRole(['secretaire', 'admin']), async (req, res) => {
  const patients = await Patient.getAllPatients();
  res.json(patients);
});

// Get a single patient
router.get('/:id', authenticateToken, checkRole(['secretaire', 'admin', 'medecin', 'patient']), async (req, res) => {
  const patient = await Patient.getPatientById(req.params.id);
  if (!patient) return res.status(404).json({ message: "Patient not found" });
  res.json(patient);
});

// Update patient
router.put('/:id', authenticateToken, checkRole(['secretaire', 'admin']), async (req, res) => {
  await Patient.updatePatient(req.params.id, req.body);
  res.json({ message: "Patient updated" });
});

// Search patients
router.get('/search/:query', authenticateToken, checkRole(['secretaire', 'admin']), async (req, res) => {
  const patients = await Patient.searchPatients(req.params.query);
  res.json(patients);
});

export default router;