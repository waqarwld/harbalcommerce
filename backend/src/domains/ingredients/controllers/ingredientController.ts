import { Request, Response } from 'express';
import { AppError } from '../../../shared/utils/response';

let ingredients: any[] = [];
let counter = 1;

export const getAll = async (_req: Request, res: Response) => {
  res.json({ success: true, data: ingredients });
};

export const create = async (req: Request, res: Response) => {
  const { name, description, status } = req.body;
  const ing = { id: counter++, name, description, status: status || 'active', createdAt: new Date(), updatedAt: new Date() };
  ingredients.push(ing);
  res.status(201).json({ success: true, data: ing });
};

export const update = async (req: Request, res: Response) => {
  const idx = ingredients.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Ingredient not found', 404);
  ingredients[idx] = { ...ingredients[idx], ...req.body, updatedAt: new Date() };
  res.json({ success: true, data: ingredients[idx] });
};

export const archive = async (req: Request, res: Response) => {
  const idx = ingredients.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Ingredient not found', 404);
  ingredients[idx].status = 'archived';
  ingredients[idx].updatedAt = new Date();
  res.json({ success: true, data: ingredients[idx] });
};