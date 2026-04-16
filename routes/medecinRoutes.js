import express from 'express';
import { getAllMedecins, createMedecin, updateMedecin, deleteMedecin } from '../controllers/medecinController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/', getAllMedecins);
router.post('/', restrictTo('admin'), createMedecin);
router.put('/:id', restrictTo('admin'), updateMedecin);
router.delete('/:id', restrictTo('admin'), deleteMedecin);

export default router;