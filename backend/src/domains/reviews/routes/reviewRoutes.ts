import { Router } from 'express';
import { getAll, create, update, moderate } from '../controllers/reviewController';
import { authenticateToken } from '../../../middleware/auth';
import { isAdmin } from '../../../middleware/rbac';

const router = Router();

router.get('/', getAll);
router.post('/', authenticateToken, create);
router.put('/:id', authenticateToken, isAdmin, update);
router.patch('/:id/moderate', authenticateToken, isAdmin, moderate);

export default router;