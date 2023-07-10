import express from 'express';
import { check } from 'express-validator';
const authRoutes = express.Router()
import authControlloer from '../controllers/auth.controller';
import validateFields from '../middlewares/validate-fields';
import validateJWT from '../middlewares/validate-jwt'

const validateLogin = [
    check('username', 'El username es requerido').not().isEmpty(),
    check('password', 'El password es requerido').not().isEmpty(),
    validateFields]
  
const validateCreate = [
    check('username', 'El username es requerido').not().isEmpty(),
    check('password', 'El password es requerido').not().isEmpty(),
    check('name', 'El nombre es requerido').not().isEmpty(),

    validateFields]
     
authRoutes.post('/login', validateLogin, authControlloer.login)
authRoutes.post('/register', validateCreate, authControlloer.createUser)

export default authRoutes

