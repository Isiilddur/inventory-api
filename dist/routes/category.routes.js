"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var categoryRoutes = express_1["default"].Router();
var category_controller_1 = __importDefault(require("../controllers/category.controller"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validationCategory = [
    (0, express_validator_1.check)('name', 'El nombre es necesario').exists(),
    validate_fields_1["default"]
];
var idValidation = [
    (0, express_validator_1.check)('id', 'El Id no es valido o no existe').exists().isUUID(),
];
categoryRoutes.post('/category', validationCategory, category_controller_1["default"].createCategory);
categoryRoutes.put('/category/:id', idValidation.concat(validationCategory), category_controller_1["default"].updateCategory);
categoryRoutes["delete"]('/category/:id', idValidation, category_controller_1["default"].deleteCategory);
categoryRoutes.get('/categories', category_controller_1["default"].listCategories);
categoryRoutes.get('/category/:id', idValidation, category_controller_1["default"].getCategory);
exports["default"] = categoryRoutes;
//# sourceMappingURL=category.routes.js.map