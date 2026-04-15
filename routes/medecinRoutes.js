import express from 'express';
const router = express.Router();

// Example route - add your actual routes here
router.get('/', (req, res) => {
  res.json({ message: 'Médecin routes working' });
});

router.post('/register', (req, res) => {
  // Your actual doctor registration logic
  res.json({ message: 'Doctor registered' });
});

export default router;