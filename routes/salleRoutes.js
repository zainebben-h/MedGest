import express from 'express';
const router = express.Router();

// Your salle routes here
router.get('/', (req, res) => {
  res.json({ message: 'Salle routes working' });
});

export default router;