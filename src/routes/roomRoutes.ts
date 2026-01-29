import { Router } from 'express';
import { getRoomItems, buyItem, getUserInventory } from '../controllers/roomController';

const router = Router();

router.get('/items', getRoomItems);
router.post('/buy-item', buyItem);
router.get('/inventory/:telegramId', getUserInventory);

export default router;
