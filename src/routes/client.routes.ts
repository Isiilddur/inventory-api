import express from 'express';
import { body, check } from 'express-validator';
const clientRoutes = express.Router()

import clientController from '../controllers/client.controller';
import validateFields from '../middlewares/validate-fields'

let validationClient : any[]= [
    check('clientId', 'El cliente es necesario').exists(),
    check('products', 'Debe tener al menos un producto').isArray(),
    validateFields
]

const idValidation: any[]= [
    check('id', 'El Id no es valido o no existe').exists().isUUID(),
 ]
clientRoutes.post('/client', validationClient, clientController.createClient);
clientRoutes.put('/client/:id', idValidation.concat(validationClient), clientController.updateClient);
clientRoutes.delete('/client/:id', idValidation, clientController.deleteClient);
clientRoutes.get('/clients', clientController.listClients);
clientRoutes.get('/client/:id', idValidation, clientController.getClient);



export default clientRoutes; 