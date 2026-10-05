import { Request, Response } from 'express';
import { AppError } from '../../../shared/utils/response';

let products: any[] = [];
let productIdCounter = 1;

export const getAll = async (req: Request, res: Response) => {
  const { category, search, page = '1', limit = '20' } = req.query;
  let result = products;

  if (category) result = result.filter(p => p.category === category);
  if (search) {
    const s = (search as string).toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
  }

  const p = parseInt(page as string);
  const l = parseInt(limit as string);
  const paginated = result.slice((p - 1) * l, p * l);

  res.json({ success: true, data: paginated, pagination: { page: p, limit: l, total: result.length, totalPages: Math.ceil(result.length / l) } });
};

export const getById = async (req: Request, res: Response) => {
  const p = products.find(x => x.id === parseInt(req.params.id));
  if (!p) throw new AppError('Product not found', 404);
  res.json({ success: true, data: p });
};

export const create = async (req: Request, res: Response) => {
  const { name, sku, description, category, price, salePrice, stockStatus, type, ingredients, images, directions, warnings, storageInstructions } = req.body;

  const product = {
    id: productIdCounter++,
    name, sku, description, category, price, salePrice,
    stockStatus: stockStatus || 'in_stock',
    type: type || 'loose_herb',
    ingredients, images: images || [],
    directions, warnings, storageInstructions,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  products.push(product);
  res.status(201).json({ success: true, data: product });
};

export const update = async (req: Request, res: Response) => {
  const idx = products.findIndex(x => x.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Product not found', 404);

  products[idx] = { ...products[idx], ...req.body, updatedAt: new Date() };
  res.json({ success: true, data: products[idx] });
};

export const archive = async (req: Request, res: Response) => {
  const idx = products.findIndex(x => x.id === parseInt(req.params.id));
  if (idx === -1) throw new AppError('Product not found', 404);
  products[idx].status = 'archived';
  products[idx].updatedAt = new Date();
  res.json({ success: true, data: products[idx] });
};