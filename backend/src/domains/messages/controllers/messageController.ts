import { Request, Response } from 'express';
import { AppError } from '../../shared/utils/response';

const messages: any[] = [];
let counter = 1;

export const getAll = async (_req: Request, res: Response) => {
  res.json({ success: true, data: messages });
};

export const create = async (req: Request, res: Response) => {
  const m = { id: counter++, status: 'open', ...req.body, createdAt: new Date(), updatedAt: new Date() };
  messages.push(m);
  res.status(201).json({ success: true, data: m });
};

export const respond = async (req: Request, res: Response) => {
  const idx = messages.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Message not found', 404);
  messages[idx] = { ...messages[idx], adminResponse: req.body.response, updatedAt: new Date() };
  res.json({ success: true, data: messages[idx] });
};

export const update = async (req: Request, res: Response) => {
  const idx = messages.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Message not found', 404);
  messages[idx].status = req.body.status;
  messages[idx].updatedAt = new Date();
  res.json({ success: true, data: messages[idx] });
};