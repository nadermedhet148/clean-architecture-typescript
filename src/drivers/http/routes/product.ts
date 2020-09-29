import express from 'express';
import ProductsController  from '../controllers/ProductController';
import { httpHandler } from '../utils/httpHandler';


const router = express.Router();

export const productsRoutes = () => {
  router.get('/', httpHandler(ProductsController.getProducts));
  return router;
};

