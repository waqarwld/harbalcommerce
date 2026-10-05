import { Request, Response } from 'express';
import { AppError } from '../../shared/utils/response';

const reviews: any[] = [];
let counter = 1;

export const getAll = async (_req: Request, res: Response) => {
  res.json({ success: true, data: reviews });
};

export const create = async (req: Request, res: Response) => {
  const r = { id: counter++, status: 'pending', ...req.body, createdAt: new Date(), updatedAt: new Date() };
  reviews.push(r);
  res.status(201).json({ success: true, data: r });
};

export const update = async (req: Request, res: Response) => {
  const idx = reviews.findIndex(r => r.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Review not found', 404);
  reviews[idx] = { ...reviews[idx], ...req.body, updatedAt: new Date() };
  res.json({ success: true, data: reviews[idx] });
};

export const moderate = async (req: Request, res: Response) => {
  const idx = reviews.findIndex(r => r.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Review not found', 404);
  reviews[idx].status = req.body.status;
  reviews[idx].updatedAt = new Date();
  res.json({ success: true, data: reviews[idx] });
};