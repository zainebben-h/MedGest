import Patient from '../models/Patient.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const { nom, email, password, date_naissance, telephone, adresse } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(nom, email, hashedPassword, 'patient');
    const patientId = await Patient.create(userId, date_naissance, telephone, adresse);
    
    res.status(201).json({ id: patientId, message: 'Patient créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    await Patient.update(id, updates);
    res.json({ message: 'Patient mis à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await Patient.delete(id);
    res.json({ message: 'Patient supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};