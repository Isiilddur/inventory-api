"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var orderRoutes = express_1["default"].Router();
var order_controller_1 = __importDefault(require("../controllers/order.controller"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validationOrder = [
    (0, express_validator_1.check)("clientId", "El cliente es necesario").exists(),
    (0, express_validator_1.check)("products", "Debe tener al menos un producto").isArray(),
    validate_fields_1["default"],
];
var idValidation = [
    (0, express_validator_1.check)("id", "El Id no es valido o no existe").exists().isUUID(),
];
orderRoutes.post("/order", validationOrder, order_controller_1["default"].createOrder);
orderRoutes["delete"]("/order/:id", idValidation.concat(validate_fields_1["default"]), order_controller_1["default"].deleteOrder);
orderRoutes.get("/orders", order_controller_1["default"].listOrders);
orderRoutes.get("/order/:id", idValidation.concat(validate_fields_1["default"]), order_controller_1["default"].getOrder);
orderRoutes.get("/orders/client/:id", idValidation.concat(validate_fields_1["default"]), order_controller_1["default"].listOrdersByClient);
orderRoutes.get("/orders/:status", idValidation.concat(validate_fields_1["default"]), order_controller_1["default"].listOrdersByStatus);
orderRoutes.get("/datesFilt/orders", order_controller_1["default"].listOrdersBetweenDates);
exports["default"] = orderRoutes;
//# sourceMappingURL=order.routes.js.map