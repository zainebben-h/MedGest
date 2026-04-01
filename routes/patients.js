const express = require('express');
const router = express.Router();

// Route de base pour les patients
router.get('/', (req, res) => {
  res.send('Route des patients');
});

module.exports = router;
