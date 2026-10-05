import { Router } from 'express';
import { getAll, create, update, getById } from '../controllers/orderController';
import { authenticateToken } from '../../../middleware/auth';
import { isAdmin } from '../../../middleware/rbac';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authenticateToken, create);
router.put('/:id/status', authenticateToken, isAdmin, update);

export default router;