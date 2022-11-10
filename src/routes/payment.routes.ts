import express from 'express';
import { body, check } from 'express-validator';
const paymentRoutes = express.Router()

import paymentController from '../controllers/payment.controller';
import validateFields from '../middlewares/validate-fields'

let validationPayment : any[]= [
    check('amount', 'El monto es necesario').exists(),
    check('orderId', 'El id de la orden es necesario').exists(),
    check('clientId', 'El id del cliente es necesario').exists(),

    validateFields
]

const idValidation: any[]= [
    check('id', 'El Id no es valido o no existe').exists().isUUID(),
 ]
paymentRoutes.post('/payment', validationPayment, paymentController.createPayment);
paymentRoutes.put('/payment/:id', idValidation.concat(validationPayment), paymentController.updatePayment);
paymentRoutes.delete('/payment/:id', idValidation, paymentController.deletePayment);
paymentRoutes.get('/payments', paymentController.listPayments);
paymentRoutes.get('/payments/:id', paymentController.listPaymentsByClient);
paymentRoutes.get('/payment/:id', idValidation, paymentController.getPayment);



export default paymentRoutes;