import { Request, Response } from 'express';
import { AppError } from '../../shared/utils/response';

const payments: any[] = [];
let counter = 1;

export const getAll = async (_req: Request, res: Response) => {
  res.json({ success: true, data: payments });
};

export const create = async (req: Request, res: Response) => {
  const p = { id: counter++, ...req.body, createdAt: new Date(), updatedAt: new Date() };
  payments.push(p);
  res.status(201).json({ success: true, data: p });
};

export const update = async (req: Request, res: Response) => {
  const idx = payments.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Payment not found', 404);
  payments[idx] = { ...payments[idx], ...req.body, updatedAt: new Date() };
  res.json({ success: true, data: payments[idx] });
};