// File: controllers/patientController.js
import Patient from '../models/Patient.js';

export const createPatient = async (req, res) => {
  try {
    const patient_id = await Patient.createPatient(
      req.body.utilisateur_id,
      req.body.date_naissance,
      req.body.telephone,
      req.body.adresse || ''
    );
    res.status(201).json({ patient_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.getAllPatients();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.getPatientById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    await Patient.updatePatient(req.params.id, req.body);
    res.json({ message: "Patient updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchPatients = async (req, res) => {
  try {
    const patients = await Patient.searchPatients(req.params.query);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};