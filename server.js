import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import medecinRoutes from './routes/medecinRoutes.js';
import salleRoutes from './routes/salleRoutes.js';
import rdvRoutes from './routes/rdvRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/rdv', rdvRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ MedGest Server running on port ${PORT}`);
});