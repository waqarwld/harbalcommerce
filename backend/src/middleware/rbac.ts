import { Request, Response, NextFunction } from 'express';

interface RoleRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const requireRole = (...allowedRoles: string[]) => {
  return (req: RoleRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

export const isAdmin = (req: RoleRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};