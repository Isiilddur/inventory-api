"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var clientRoutes = express_1["default"].Router();
var client_controller_1 = __importDefault(require("../controllers/client.controller"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validationClient = [
    (0, express_validator_1.check)('name', 'El nombre es necesario').exists(),
    validate_fields_1["default"]
];
var idValidation = [
    (0, express_validator_1.check)('id', 'El Id no es valido o no existe').exists().isUUID(),
];
clientRoutes.post('/client', validationClient, client_controller_1["default"].createClient);
clientRoutes.put('/client/:id', idValidation.concat(validationClient), client_controller_1["default"].updateClient);
clientRoutes["delete"]('/client/:id', idValidation, client_controller_1["default"].deleteClient);
clientRoutes.get('/clients', client_controller_1["default"].listClients);
clientRoutes.get('/client/:id', idValidation, client_controller_1["default"].getClient);
exports["default"] = clientRoutes;
//# sourceMappingURL=client.routes.js.map