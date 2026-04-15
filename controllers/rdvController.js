// File: controllers/rdvController.js
import RendezVous from '../models/RendezVous.js';

export const createRdv = async (req, res) => {
  try {
    const rdv_id = await RendezVous.createRdv(
      req.body.patient_id,
      req.body.medecin_id,
      req.body.salle_id,
      req.body.date_rdv,
      req.body.motif
    );
    res.status(201).json({ rdv_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRdv = async (req, res) => {
  try {
    const rdvs = await RendezVous.getAllRdv();
    res.json(rdvs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getByPatient = async (req, res) => {
  try {
    const rdvs = await RendezVous.getByPatient(req.params.id);
    res.json(rdvs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRdv = async (req, res) => {
  try {
    await RendezVous.updateRdv(req.params.id, req.body);
    res.json({ message: "Appointment updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchByPatient = async (req, res) => {
  try {
    const rdvs = await RendezVous.searchByPatient(req.params.query);
    res.json(rdvs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};