import express from 'express';
import { body, check } from 'express-validator';
const storeRoutes = express.Router()

import storeController from '../controllers/store.controller';
import validateFields from '../middlewares/validate-fields'

let validationStore : any[]= [
    check('name', 'El nombre es necesario').exists(),
    validateFields
]

const idValidation: any[]= [
    check('id', 'El Id no es valido o no existe').exists().isUUID(),
 ]
storeRoutes.post('/store', validationStore, storeController.createStore);
storeRoutes.put('/store/:id', idValidation.concat(validationStore), storeController.updateStore);
storeRoutes.delete('/store/:id', idValidation, storeController.deleteStore);
storeRoutes.get('/stores', storeController.listStores);
storeRoutes.get('/store/:id', idValidation, storeController.getStore);



export default storeRoutes;