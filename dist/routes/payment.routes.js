"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var paymentRoutes = express_1["default"].Router();
var payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validationPayment = [
    (0, express_validator_1.check)('amount', 'El monto es necesario').exists(),
    (0, express_validator_1.check)('orderId', 'El id de la orden es necesario').exists(),
    (0, express_validator_1.check)('clientId', 'El id del cliente es necesario').exists(),
    validate_fields_1["default"]
];
var idValidation = [
    (0, express_validator_1.check)('id', 'El Id no es valido o no existe').exists().isUUID(),
];
paymentRoutes.post('/payment', validationPayment, payment_controller_1["default"].createPayment);
paymentRoutes.put('/payment/:id', idValidation.concat(validationPayment), payment_controller_1["default"].updatePayment);
paymentRoutes["delete"]('/payment/:id', idValidation, payment_controller_1["default"].deletePayment);
paymentRoutes.get('/payments', payment_controller_1["default"].listPayments);
paymentRoutes.get('/payments/:id', payment_controller_1["default"].listPaymentsByClient);
paymentRoutes.get('/payment/:id', idValidation, payment_controller_1["default"].getPayment);
exports["default"] = paymentRoutes;
//# sourceMappingURL=payment.routes.js.map