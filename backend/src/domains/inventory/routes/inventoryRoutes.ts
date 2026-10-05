import { Router } from 'express';
import { getAll, create, update, getById } from '../controllers/inventoryController';
import { authenticateToken } from '../../../middleware/auth';
import { isAdmin } from '../../../middleware/rbac';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authenticateToken, isAdmin, create);
router.put('/:id', authenticateToken, isAdmin, update);

export default router;