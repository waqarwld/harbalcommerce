import { Router } from 'express';
import { getAll, create, update, archive } from '../controllers/ingredientController';
import { authenticateToken } from '../../../middleware/auth';
import { isAdmin } from '../../../middleware/rbac';

const router = Router();

router.get('/', getAll);
router.post('/', authenticateToken, isAdmin, create);
router.put('/:id', authenticateToken, isAdmin, update);
router.patch('/:id/status', authenticateToken, isAdmin, archive);

export default router;