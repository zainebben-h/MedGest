const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

  module.exports = router;