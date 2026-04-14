const mongoose = require('mongoose');

const medecinSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  specialite: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Medecin', medecinSchema);
const express = require('express');
const Medecin = require('../models/Medecin'); // Note: Typo in "Medein.js"?
const router = express.Router();

// Example: Get all médecins
router.get('/Medecin', async (req, res) => {
  try {
    const medecins = await Medecin.find();
    res.json(medecins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
