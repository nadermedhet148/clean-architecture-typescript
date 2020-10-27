import express from 'express';
import ProductsController  from '../controllers/ProductController';
import { pagination } from '../middleware/pagination';
import { httpHandler } from '../utils/httpHandler';


const router = express.Router();

export const productsRoutes = () => {
  router.get('/categories/:category_id', pagination , httpHandler(ProductsController.getProducts));
  router.put('/available/:product_id/provider/:provider_id' , httpHandler(ProductsController.toggleProductAvailability));

  return router;
};

