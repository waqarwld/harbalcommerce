import { Request, Response } from 'express';
import { AppError } from '../../../shared/utils/response';

interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  status: string;
  total: number;
  shippingAddress: any;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

const orders: Order[] = [];
let counter = 1;

export const getAll = async (_req: Request, res: Response) => {
  res.json({ success: true, data: orders });
};

export const getById = async (req: Request, res: Response) => {
  const o = orders.find(o => o.id === parseInt(req.params.id));
  if (!o) throw new AppError('Order not found', 404);
  res.json({ success: true, data: o });
};

export const create = async (req: Request, res: Response) => {
  const o: Order = { id: counter++, orderNumber: `ORD-${counter}`, ...req.body, createdAt: new Date(), updatedAt: new Date() };
  orders.push(o);
  res.status(201).json({ success: true, data: o });
};

export const update = async (req: Request, res: Response) => {
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Order not found', 404);
  orders[idx] = { ...orders[idx], ...req.body, updatedAt: new Date() };
  res.json({ success: true, data: orders[idx] });
};