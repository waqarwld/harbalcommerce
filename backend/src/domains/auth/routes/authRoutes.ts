import { Router } from 'express';
import { register, login, refresh, logout, getProfile } from '../controllers/authController';
import { authenticateToken } from '../../../middleware/auth';
import { body } from 'express-validator';
import { validate } from '../../../shared/utils/validation';

const router = Router();

router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().notEmpty(),
  validate,
  register
);

router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  validate,
  login
);

router.post('/refresh',
  body('refreshToken').notEmpty(),
  validate,
  refresh
);

router.post('/logout',
  body('refreshToken').optional(),
  validate,
  logout
);

router.get('/profile', authenticateToken, getProfile);

export default router;