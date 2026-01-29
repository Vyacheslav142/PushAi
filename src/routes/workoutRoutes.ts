import { Router } from 'express';
import { recordWorkout, getWorkoutHistory } from '../controllers/workoutController';

const router = Router();

router.post('/record-workout', recordWorkout);
router.get('/history/:telegramId', getWorkoutHistory);

export default router;
