import RendezVous from '../models/RendezVous.js';
import Patient from '../models/Patient.js';
import Medecin from '../models/Medecin.js';

export const getAllRDV = async (req, res) => {
  try {
    const rdvs = await RendezVous.findAll();
    res.json(rdvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRDV = async (req, res) => {
  try {
    let rdvs;
    if (req.user.role === 'patient') {
      const patient = await Patient.findByUserId(req.user.id);
      if (!patient) return res.status(404).json({ message: 'Patient non trouvé' });
      rdvs = await RendezVous.findByPatient(patient.id);
    } else if (req.user.role === 'medecin') {
      const medecin = await Medecin.findByUserId(req.user.id);
      if (!medecin) return res.status(404).json({ message: 'Médecin non trouvé' });
      rdvs = await RendezVous.findByMedecin(medecin.id);
    } else {
      // secretaire/admin - see all
      rdvs = await RendezVous.findAll();
    }
    res.json(rdvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRDV = async (req, res) => {
  try {
    const { patient_id, medecin_id, salle_id, date_rdv, motif } = req.body;
    const id = await RendezVous.create(patient_id, medecin_id, salle_id, date_rdv, motif);
    res.status(201).json({ id, message: 'Rendez-vous créé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRDV = async (req, res) => {
  try {
    const { id } = req.params;
    await RendezVous.update(id, req.body);
    res.json({ message: 'Rendez-vous mis à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const confirmRDV = async (req, res) => {
  try {
    const { id } = req.params;
    await RendezVous.updateStatut(id, 'confirme');
    res.json({ message: 'Rendez-vous confirmé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelRDV = async (req, res) => {
  try {
    const { id } = req.params;
    await RendezVous.updateStatut(id, 'annule');
    res.json({ message: 'Rendez-vous annulé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeRDV = async (req, res) => {
  try {
    const { id } = req.params;
    await RendezVous.updateStatut(id, 'termine');
    res.json({ message: 'Rendez-vous terminé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRDV = async (req, res) => {
  try {
    const { id } = req.params;
    await RendezVous.delete(id);
    res.json({ message: 'Rendez-vous supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};