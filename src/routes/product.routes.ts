import express from 'express';
import { check } from 'express-validator';
const productsRoutes = express.Router()
import productsController from '../controllers/products.controller';
import validateFields from '../middlewares/validate-fields';

let validationProduct : any[]= [
    check('name', 'El nombre es necesario').exists(),
    check('storeId', 'Es necesario asignar a una tienda').exists().isUUID(),
    check('price', 'Es necesario asignar un precio').exists().isNumeric(),
    check('unit', 'Es necesario asignar una medida.').exists().isIn(["KILOS", "GRAMOS", "PIEZAS"]),
    check('categoryId', 'Es necesario asignar una categoria').exists(),
    validateFields
]

const idValidation: any[]= [
    check('id', 'El Id no es valido o no existe').exists().isUUID(),
 ]
productsRoutes.post('/product', validationProduct, productsController.createProduct);
productsRoutes.put('/product/:id', idValidation.concat(validationProduct), productsController.updateProduct);
productsRoutes.delete('/product/:id', idValidation, productsController.deleteProduct);
productsRoutes.get('/product/:id', idValidation, productsController.findProduct);
productsRoutes.get('/products', productsController.listProducts);

export default productsRoutes;