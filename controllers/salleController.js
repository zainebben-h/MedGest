import Salle from '../models/Salle.js';

export const getAllSalles = async (req, res) => {
  try {
    const salles = await Salle.findAll();
    res.json(salles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSalle = async (req, res) => {
  try {
    const { nom, type, capacite } = req.body;
    const id = await Salle.create(nom, type, capacite);
    res.status(201).json({ id, message: 'Salle créée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSalle = async (req, res) => {
  try {
    const { id } = req.params;
    await Salle.update(id, req.body);
    res.json({ message: 'Salle mise à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSalle = async (req, res) => {
  try {
    const { id } = req.params;
    await Salle.delete(id);
    res.json({ message: 'Salle supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};