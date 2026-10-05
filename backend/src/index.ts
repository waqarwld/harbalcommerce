import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './domains/auth/routes/authRoutes';
import productRoutes from './domains/products/routes/productRoutes';
import categoryRoutes from './domains/categories/routes/categoryRoutes';
import ingredientRoutes from './domains/ingredients/routes/ingredientRoutes';
import inventoryRoutes from './domains/inventory/routes/inventoryRoutes';
import orderRoutes from './domains/orders/routes/orderRoutes';
import customerRoutes from './domains/customers/routes/customerRoutes';
import paymentRoutes from './domains/payments/routes/paymentRoutes';
import reviewRoutes from './domains/reviews/routes/reviewRoutes';
import messageRoutes from './domains/messages/routes/messageRoutes';
import notificationRoutes from './domains/notifications/routes/notificationRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API v1 routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/ingredients', ingredientRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;