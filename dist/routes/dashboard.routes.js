"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
var dashboardRoutes = express_1["default"].Router();
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validationOrder = [
    (0, express_validator_1.check)("clientId", "El cliente es necesario").exists(),
    (0, express_validator_1.check)("products", "Debe tener al menos un producto").isArray(),
    validate_fields_1["default"],
];
var idValidation = [
    (0, express_validator_1.check)("id", "El Id no es valido o no existe").exists().isUUID(),
];
dashboardRoutes.get("/dashboard/ordersToReceive", dashboard_controller_1["default"].ordesToReceive);
dashboardRoutes.get("/dashboard/incomeByDate", dashboard_controller_1["default"].incomeByDate);
dashboardRoutes.get("/dashboard/dataByStore/:id", dashboard_controller_1["default"].dataByStore);
dashboardRoutes.get("/dashboard/getMoneyByCategoryAndDay", dashboard_controller_1["default"].getMoneyByCategoryAndDay);
exports["default"] = dashboardRoutes;
//# sourceMappingURL=dashboard.routes.js.map