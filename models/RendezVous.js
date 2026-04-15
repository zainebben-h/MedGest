const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  medecin: { type: mongoose.Schema.Types.ObjectId, ref: 'Medecin', required: true },
  dateHeure: { type: Date, required: true },
  statut: { type: String, enum: ['planifié', 'annulé', 'terminé'], default: 'planifié' },
});

module.exports = mongoose.model('RendezVous', rendezVousSchema);
