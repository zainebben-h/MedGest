const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

// Inscription
router.post('/register', async (req, res) => {
  const { nom, email, motDePasse, role } = req.body;

  try {
    let utilisateur = await Utilisateur.findOne({ email });
    if (utilisateur) {
      return res.status(400).json({ success: false, message: 'Un utilisateur existe déjà avec cet email.' });
    }

    utilisateur = new Utilisateur({
      nom,
      email,
      motDePasse: await bcrypt.hash(motDePasse, 10),
      role,
    });

    await utilisateur.save();

    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, role: utilisateur.role });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect.' });
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseValide) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, role: utilisateur.role });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

module.exports = router;
