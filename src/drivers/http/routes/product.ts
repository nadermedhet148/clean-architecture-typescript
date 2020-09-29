import express from 'express';
import ProductsController  from '../controllers/ProductController';
import { pagination } from '../middleware/pagination';
import { httpHandler } from '../utils/httpHandler';


const router = express.Router();

export const productsRoutes = () => {
  router.get('/', pagination , httpHandler(ProductsController.getProducts));
  return router;
};

