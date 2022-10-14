import express from 'express';
import { body, check } from 'express-validator';
const userRoutes = express.Router()

import userController from '../controllers/user.controller';
import validateFields from '../middlewares/validate-fields'

let validationUser : any[]= [
    check('phone', 'El telefono no es valido').isMobilePhone('es-MX'),
    check('username', "Debes enviar un nombre de usuario").exists(),
    check('password', "El password debe ser más largo.").isLength({min:10}),
    check('name', 'El nombre es necesario').exists(),
    validateFields
]

const idValidation: any[]= [
    check('id', 'El Id no es valido o no existe').exists().isUUID(),
 ]
userRoutes.post('/user', validationUser, userController.createUser);
userRoutes.put('/user/:id', idValidation.concat(validationUser), userController.updateUser);
userRoutes.delete('/user/:id', idValidation, userController.deleteUser);
userRoutes.get('/users', userController.listUsers);
userRoutes.get('/user/:id', idValidation, userController.getUser);



export default userRoutes;