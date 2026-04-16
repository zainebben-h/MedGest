import express from 'express';
import { getAllPatients, createPatient, updatePatient, deletePatient } from '../controllers/patientController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/', restrictTo('admin', 'medecin', 'secretaire'), getAllPatients);
router.post('/', restrictTo('admin', 'secretaire'), createPatient);
router.put('/:id', restrictTo('admin', 'secretaire'), updatePatient);
router.delete('/:id', restrictTo('admin'), deletePatient);

export default router;