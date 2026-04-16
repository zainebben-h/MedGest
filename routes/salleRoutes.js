import express from 'express';
import { getAllSalles, createSalle, updateSalle, deleteSalle } from '../controllers/salleController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/', getAllSalles);
router.post('/', restrictTo('admin'), createSalle);
router.put('/:id', restrictTo('admin'), updateSalle);
router.delete('/:id', restrictTo('admin'), deleteSalle);

export default router;