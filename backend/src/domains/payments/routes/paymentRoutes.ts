import { Router } from 'express';
import { getAll, create, update } from '../controllers/paymentController';
import { authenticateToken } from '../../../middleware/auth';
import { isAdmin } from '../../../middleware/rbac';

const router = Router();

router.get('/', getAll);
router.post('/', authenticateToken, create);
router.put('/:id', authenticateToken, isAdmin, update);

export default router;