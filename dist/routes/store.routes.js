"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var storeRoutes = express_1["default"].Router();
var store_controller_1 = __importDefault(require("../controllers/store.controller"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validationStore = [
    (0, express_validator_1.check)('name', 'El nombre es necesario').exists(),
    validate_fields_1["default"]
];
var idValidation = [
    (0, express_validator_1.check)('id', 'El Id no es valido o no existe').exists().isUUID(),
];
storeRoutes.post('/store', validationStore, store_controller_1["default"].createStore);
storeRoutes.put('/store/:id', idValidation.concat(validationStore), store_controller_1["default"].updateStore);
storeRoutes["delete"]('/store/:id', idValidation, store_controller_1["default"].deleteStore);
storeRoutes.get('/stores', store_controller_1["default"].listStores);
storeRoutes.get('/store/:id', idValidation, store_controller_1["default"].getStore);
exports["default"] = storeRoutes;
//# sourceMappingURL=store.routes.js.map