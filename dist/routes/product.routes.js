"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var productsRoutes = express_1["default"].Router();
var products_controller_1 = __importDefault(require("../controllers/products.controller"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validationProduct = [
    (0, express_validator_1.check)('name', 'El nombre es necesario').exists(),
    (0, express_validator_1.check)('storeId', 'Es necesario asignar a una tienda').exists(),
    (0, express_validator_1.check)('categoryId', 'Es necesario asignar una categoria').exists(),
    validate_fields_1["default"]
];
var idValidation = [
    (0, express_validator_1.check)('id', 'El Id no es valido o no existe').exists(),
];
productsRoutes.post('/product', validationProduct, products_controller_1["default"].createProduct);
productsRoutes.post('/product/stock/:id', idValidation.concat(validate_fields_1["default"]), products_controller_1["default"].increaseStock);
productsRoutes.put('/product/:id', idValidation.concat(validationProduct), products_controller_1["default"].updateProduct);
productsRoutes["delete"]('/product/:id', idValidation, products_controller_1["default"].deleteProduct);
productsRoutes.get('/product/:id', idValidation, products_controller_1["default"].findProduct);
productsRoutes.get('/products', products_controller_1["default"].listProducts);
productsRoutes.get('/products/order/:id', products_controller_1["default"].listProductsInOrder);
exports["default"] = productsRoutes;
//# sourceMappingURL=product.routes.js.map