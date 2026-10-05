import { Router } from 'express';
import { getAll, create, respond, update } from '../controllers/messageController';
import { authenticateToken } from '../../../middleware/auth';
import { isAdmin } from '../../../middleware/rbac';

const router = Router();

router.get('/', getAll);
router.post('/', authenticateToken, create);
router.put('/:id', authenticateToken, isAdmin, respond);
router.patch('/:id/status', authenticateToken, isAdmin, update);

export default router;