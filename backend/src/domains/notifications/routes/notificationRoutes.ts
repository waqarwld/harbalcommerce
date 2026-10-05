import { Router } from 'express';
import { getAll, create } from '../controllers/notificationController';
import { authenticateToken } from '../../../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAll);
router.post('/', authenticateToken, create);

export default router;