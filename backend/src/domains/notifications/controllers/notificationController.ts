import { Request, Response } from 'express';

const notifications: any[] = [];
let counter = 1;

export const getAll = async (_req: Request, res: Response) => {
  res.json({ success: true, data: notifications });
};

export const create = async (req: Request, res: Response) => {
  const n = { id: counter++, read: false, ...req.body, createdAt: new Date(), updatedAt: new Date() };
  notifications.push(n);
  res.status(201).json({ success: true, data: n });
};