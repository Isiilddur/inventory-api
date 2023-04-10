"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var product_routes_1 = __importDefault(require("./product.routes"));
var user_routes_1 = __importDefault(require("./user.routes"));
var category_routes_1 = __importDefault(require("./category.routes"));
var store_routes_1 = __importDefault(require("./store.routes"));
var order_routes_1 = __importDefault(require("./order.routes"));
var dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
var auth_routes_1 = __importDefault(require("./auth.routes"));
var client_routes_1 = __importDefault(require("./client.routes"));
var payment_routes_1 = __importDefault(require("./payment.routes"));
router.use(auth_routes_1["default"]);
router.use(product_routes_1["default"]);
router.use(user_routes_1["default"]);
router.use(category_routes_1["default"]);
router.use(store_routes_1["default"]);
router.use(order_routes_1["default"]);
router.use(dashboard_routes_1["default"]);
router.use(client_routes_1["default"]);
router.use(payment_routes_1["default"]);
//router.use(require('./category.routes'))
exports["default"] = router;
//# sourceMappingURL=routes.js.map