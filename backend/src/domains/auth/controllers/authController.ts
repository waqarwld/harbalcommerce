import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../shared/utils/response';

const users: any[] = [];
const refreshTokens: Set<string> = new Set();

export const register = async (req: Request, res: Response) => {
  const { email, password, name, role = 'customer' } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) throw new AppError('Email already registered', 409);

  const hashed = await bcrypt.hash(password, 12);
  const user = {
    id: users.length + 1,
    email,
    name,
    password: hashed,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(user);

  res.status(201).json({ success: true, data: { id: user.id, email: user.email, name: user.name, role: user.role } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) throw new AppError('Invalid credentials', 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError('Invalid credentials', 401);

  const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'default', { expiresIn: '24h' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET || 'default-refresh', { expiresIn: '7d' });
  refreshTokens.add(refreshToken);

  res.json({ success: true, data: { accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } } });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.has(refreshToken)) throw new AppError('Invalid refresh token', 403);

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'default-refresh') as any;
    const user = users.find(u => u.id === decoded.id);
    if (!user) throw new AppError('User not found', 404);

    const newAccess = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'default', { expiresIn: '24h' });
    res.json({ success: true, data: { accessToken: newAccess } });
  } catch {
    throw new AppError('Invalid refresh token', 403);
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (refreshToken) refreshTokens.delete(refreshToken);
  res.json({ success: true, message: 'Logged out successfully' });
};

export const getProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ success: true, data: { id: user.id, email: user.email, role: user.role } });
};