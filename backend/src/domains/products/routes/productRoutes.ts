import { Router } from 'express';
import { getAll, getById, create, update, archive } from '../controllers/productController';
import { authenticateToken } from '../../../middleware/auth';
import { isAdmin } from '../../../middleware/rbac';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authenticateToken, isAdmin, create);
router.put('/:id', authenticateToken, isAdmin, update);
router.patch('/:id/status', authenticateToken, isAdmin, archive);

export default router;