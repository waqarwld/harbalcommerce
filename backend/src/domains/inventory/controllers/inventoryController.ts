import { Request, Response } from 'express';
import { AppError } from '../../shared/utils/response';

interface InventoryRecord {
  id: number;
  productId: number;
  batchNumber: string;
  quantity: number;
  minStockLevel: number;
  reorderLevel: number;
  manufacturingDate: Date;
  expirationDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const inventory: InventoryRecord[] = [];
let counter = 1;

export const getAll = async (_req: Request, res: Response) => {
  res.json({ success: true, data: inventory });
};

export const getById = async (req: Request, res: Response) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) throw new AppError('Inventory item not found', 404);
  res.json({ success: true, data: item });
};

export const create = async (req: Request, res: Response) => {
  const { productId, batchNumber, quantity, minStockLevel, reorderLevel, manufacturingDate, expirationDate } = req.body;
  const item: InventoryRecord = {
    id: counter++, productId, batchNumber, quantity, minStockLevel, reorderLevel,
    manufacturingDate, expirationDate, status: 'active', createdAt: new Date(), updatedAt: new Date(),
  };
  inventory.push(item);
  res.status(201).json({ success: true, data: item });
};

export const update = async (req: Request, res: Response) => {
  const idx = inventory.findIndex(i => i.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Inventory item not found', 404);
  inventory[idx] = { ...inventory[idx], ...req.body, updatedAt: new Date() };
  res.json({ success: true, data: inventory[idx] });
};