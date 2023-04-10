"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var authRoutes = express_1["default"].Router();
var auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
var validateLogin = [
    (0, express_validator_1.check)('username', 'El username es requerido').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password es requerido').not().isEmpty(),
    validate_fields_1["default"]
];
var validateCreate = [
    (0, express_validator_1.check)('username', 'El username es requerido').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password es requerido').not().isEmpty(),
    (0, express_validator_1.check)('name', 'El nombre es requerido').not().isEmpty(),
    validate_fields_1["default"], validate_jwt_1["default"]
];
authRoutes.post('/login', validateLogin, auth_controller_1["default"].login);
authRoutes.post('/register', validateCreate, auth_controller_1["default"].createUser);
exports["default"] = authRoutes;
//# sourceMappingURL=auth.routes.js.map