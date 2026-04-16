import express from 'express';
import { getAllRDV, getMyRDV, createRDV, updateRDV, confirmRDV, cancelRDV, completeRDV, deleteRDV } from '../controllers/rdvController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/all', restrictTo('admin', 'secretaire'), getAllRDV);
router.get('/my', getMyRDV);
router.post('/', restrictTo('admin', 'secretaire'), createRDV);
router.put('/:id', restrictTo('admin', 'secretaire'), updateRDV);
router.patch('/:id/confirm', restrictTo('admin', 'secretaire', 'medecin'), confirmRDV);
router.patch('/:id/cancel', cancelRDV); // Patient can cancel their own
router.patch('/:id/complete', restrictTo('admin', 'secretaire', 'medecin'), completeRDV);
router.delete('/:id', restrictTo('admin', 'secretaire'), deleteRDV);

export default router;