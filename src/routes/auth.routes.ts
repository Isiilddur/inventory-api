import express from 'express';
import { check } from 'express-validator';
const authRoutes = express.Router()
import authControlloer from '../controllers/auth.controller';
import validateFields from '../middlewares/validate-fields';


const validateLogin = [
    check('username', 'El username es requerido').not().isEmpty(),
    check('password', 'El password es requerido').not().isEmpty(),
    validateFields]
authRoutes.post('/login', validateLogin, authControlloer.login)
export default authRoutes

