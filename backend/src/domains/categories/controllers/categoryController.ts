import { Request, Response } from 'express';
import { AppError } from '../../shared/utils/response';

let categories: any[] = [];
let counter = 1;

export const getAll = async (_req: Request, res: Response) => {
  res.json({ success: true, data: categories });
};

export const create = async (req: Request, res: Response) => {
  const { name, slug, description, parentId } = req.body;
  const cat = { id: counter++, name, slug, description, parentId, createdAt: new Date(), updatedAt: new Date() };
  categories.push(cat);
  res.status(201).json({ success: true, data: cat });
};

export const update = async (req: Request, res: Response) => {
  const idx = categories.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Category not found', 404);
  categories[idx] = { ...categories[idx], ...req.body, updatedAt: new Date() };
  res.json({ success: true, data: categories[idx] });
};

export const archive = async (req: Request, res: Response) => {
  const idx = categories.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Category not found', 404);
  categories[idx].status = 'archived';
  categories[idx].updatedAt = new Date();
  res.json({ success: true, data: categories[idx] });
};