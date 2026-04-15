import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
// File: server.js (add this line after authRoutes)
import patientRoutes from './routes/patientRoutes.js';
// File: server.js (add this line after patientRoutes)
import rdvRoutes from './routes/rdvRoutes.js';
import salleRoutes from './routes/salleRoutes.js';
import medecinRoutes from './routes/medecinRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';





dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/rdv', rdvRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/consultations', consultationRoutes);

app.listen(5000, () => {
  console.log(`MedGest backend running on http://localhost:5000`);
});