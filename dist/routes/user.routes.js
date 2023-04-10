"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var userRoutes = express_1["default"].Router();
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validationUser = [
    (0, express_validator_1.check)('phone', 'El telefono no es valido').isMobilePhone('es-MX'),
    (0, express_validator_1.check)('username', "Debes enviar un nombre de usuario").exists(),
    (0, express_validator_1.check)('password', "El password debe ser más largo.").isLength({ min: 10 }),
    (0, express_validator_1.check)('name', 'El nombre es necesario').exists(),
    validate_fields_1["default"]
];
var idValidation = [
    (0, express_validator_1.check)('id', 'El Id no es valido o no existe').exists().isUUID(),
];
userRoutes.post('/user', validationUser, user_controller_1["default"].createUser);
userRoutes.put('/user/:id', idValidation.concat(validationUser), user_controller_1["default"].updateUser);
userRoutes["delete"]('/user/:id', idValidation, user_controller_1["default"].deleteUser);
userRoutes.get('/users', user_controller_1["default"].listUsers);
userRoutes.get('/user/:id', idValidation, user_controller_1["default"].getUser);
exports["default"] = userRoutes;
//# sourceMappingURL=user.routes.js.map