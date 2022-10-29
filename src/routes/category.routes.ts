import express from 'express';
import { body, check } from 'express-validator';
const categoryRoutes = express.Router()

import categoryController from '../controllers/category.controller';
import validateFields from '../middlewares/validate-fields'

let validationCategory : any[]= [
    check('name', 'El nombre es necesario').exists(),
    validateFields
]

const idValidation: any[]= [
    check('id', 'El Id no es valido o no existe').exists().isUUID(),
 ]
categoryRoutes.post('/category', validationCategory, categoryController.createCategory);
categoryRoutes.put('/category/:id', idValidation.concat(validationCategory), categoryController.updateCategory);
categoryRoutes.delete('/category/:id', idValidation, categoryController.deleteCategory);
categoryRoutes.get('/categories', categoryController.listCategories);
categoryRoutes.get('/category/:id', idValidation, categoryController.getCategory);



export default categoryRoutes;