const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Utilisateur = require('../models/Utilisateur');

// Inscription
router.post('/inscription',
  [
    check('nom', 'Le nom est requis').not().isEmpty(),
    check('email', 'Veuillez inclure un email valide').isEmail(),
    check('motDePasse', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nom, email, motDePasse, competences } = req.body;

    try {
      let utilisateur = await Utilisateur.findOne({ email });
      if (utilisateur) {
        return res.status(400).json({ message: 'Un utilisateur existe déjà avec cet email.' });
      }

      utilisateur = new Utilisateur({
        nom,
        email,
        motDePasse: await bcrypt.hash(motDePasse, 10),
        competences,
      });

      await utilisateur.save();

      const payload = { user: { id: utilisateur.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Erreur serveur');
    }
  }
);

// Connexion
router.post('/connexion',
  [
    check('email', 'Veuillez inclure un email valide').isEmail(),
    check('motDePasse', 'Le mot de passe est requis').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, motDePasse } = req.body;

    try {
      const utilisateur = await Utilisateur.findOne({ email });
      if (!utilisateur) {
        return res.status(400).json({ message: 'Identifiants invalides.' });
      }

      const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
      if (!motDePasseValide) {
        return res.status(400).json({ message: 'Identifiants invalides.' });
      }

      const payload = { user: { id: utilisateur.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Erreur serveur');
    }
  }
);

module.exports = router;
