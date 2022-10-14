import express from 'express';
import { check } from 'express-validator';
const productsRoutes = express.Router()

import productsController from '../controllers/products.controller';

//productsRoutes.get('/product', productsController.listProduct);
//productsRoutes.get('/product/category/:category', productsController.listProductByCategory);
//productsRoutes.get('/product/:id', productsController.listProductById);
productsRoutes.post('/product', [check('')] ,productsController.createProduct);
//productsRoutes.put('/product', productsController.updateProduct);
//productsRoutes.put('/product/:id/:isAdd/:items', productsController.updateInventaryProducts);
//productsRoutes.delete('/product/:id', productsController.deleteProduct);
//productsRoutes.get('/admin/product', productsController.listProductsAdmin);

export default productsRoutes;