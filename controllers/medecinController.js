import Medecin from '../models/Medecin.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const getAllMedecins = async (req, res) => {
  try {
    const medecins = await Medecin.findAll();
    res.json(medecins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMedecin = async (req, res) => {
  try {
    const { nom, email, password, specialite } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(nom, email, hashedPassword, 'medecin');
    const medecinId = await Medecin.create(userId, specialite);
    
    res.status(201).json({ id: medecinId, message: 'Médecin créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMedecin = async (req, res) => {
  try {
    const { id } = req.params;
    const { specialite } = req.body;
    
    await Medecin.update(id, { specialite });
    res.json({ message: 'Médecin mis à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMedecin = async (req, res) => {
  try {
    const { id } = req.params;
    await Medecin.delete(id);
    res.json({ message: 'Médecin supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};