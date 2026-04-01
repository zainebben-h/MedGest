const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  entreprise: { type: String, required: true },
  lieu: { type: String, required: true },
  competencesRequises: { type: [String], default: [] },
  datePublication: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Offre', offreSchema);
