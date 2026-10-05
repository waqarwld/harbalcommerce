import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/herbalcommerce',
  {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      max: 3,
      match: ['ECONNREFUSED', 'ETIMEDOUT'],
    },
  }
);

export default sequelize;