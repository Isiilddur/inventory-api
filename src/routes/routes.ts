import express from 'express';
const router = express.Router();
import productsRoutes from './product.routes'
import userRoutes from "./user.routes";
import categoriesRoutes from "./category.routes";
import storesRoutes from "./store.routes";
import orderRoutes from "./order.routes";
import dashboardRoutes from "./dashboard.routes"
import authRoutes from "./auth.routes"
import clientRoutes from './client.routes';
import paymentRoutes from './payment.routes';

router.use(authRoutes)
router.use(productsRoutes)
router.use(userRoutes)
router.use(categoriesRoutes)
router.use(storesRoutes)
router.use(orderRoutes)
router.use(dashboardRoutes)
router.use(clientRoutes)
router.use(paymentRoutes)

//router.use(require('./category.routes'))


export default router;