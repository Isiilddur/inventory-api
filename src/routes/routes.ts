import express from 'express';
const router = express.Router();
import productsRoutes from './product.routes'
import userRoutes from "./user.routes";
router.use(productsRoutes)
router.use(userRoutes)
//router.use(require('./orders.routes'))
//router.use(require('./admin.routes'))*/
//router.use(require('./category.routes'))


export default router;