import { Router } from 'express';
import { getProfile, getPoints } from '../controllers/userController';

const router = Router();

router.get('/profile/:telegramId', getProfile);
router.get('/points/:telegramId', getPoints);

export default router;
