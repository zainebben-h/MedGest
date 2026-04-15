const express = require('express');
const router = express.Router();
const RendezVous = require('../models/RendezVous');
const authentifier = require('../middleware/auth');

// Prendre un rendez-vous
router.post('/', authentifier, async (req, res) => {
  const { patient, medecin, dateHeure } = req.body;

  try {
    const rendezVous = new RendezVous({
      patient,
      medecin,
      dateHeure,
    });

    await rendezVous.save();
    res.status(201).json({ success: true, rendezVous });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// Modifier un rendez-vous
router.put('/:id', authentifier, async (req, res) => {
  const { statut } = req.body;

  try {
    const rendezVous = await RendezVous.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    );

    if (!rendezVous) {
      return res.status(404).json({ success: false, message: 'Rendez-vous non trouvé.' });
    }

    res.json({ success: true, rendezVous });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

module.exports = router;
