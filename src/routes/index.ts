import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import workoutRoutes from './workoutRoutes';
import roomRoutes from './roomRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/workout', workoutRoutes);
router.use('/room', roomRoutes);

export default router;
