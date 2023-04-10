"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var product_service_1 = __importDefault(require("./product.service"));
var client_service_1 = __importDefault(require("./client.service"));
var prisma = new client_1.PrismaClient();
var DAYS = 3;
var createOrder = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, total, products, storeId, arrayOfProducts, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clientId = body.clientId, total = body.total, products = body.products, storeId = body.storeId;
                arrayOfProducts = generateArrayProducts(products);
                return [4 /*yield*/, prisma.order.create({
                        data: {
                            clientId: clientId,
                            total: total,
                            products: {
                                create: arrayOfProducts
                            },
                            storeId: storeId,
                            date: new Date(new Date().toLocaleDateString())
                        }
                    }).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, reduceStock(arrayOfProducts).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, updateClientDebt(clientId, total)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updateClientDebt = function (clientId, total) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client_service_1["default"].updateClientDebt(clientId, total)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var reduceStock = function (products) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, products_1, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, products_1 = products;
                _a.label = 1;
            case 1:
                if (!(_i < products_1.length)) return [3 /*break*/, 4];
                product = products_1[_i];
                return [4 /*yield*/, product_service_1["default"].decreaseStock(product.productId, product.quantity)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
var generateArrayProducts = function (products) {
    return products.map(function (product) {
        return {
            productId: product.id,
            quantity: product.quantity,
            price: product.price * product.quantity,
            categoryId: product.categoryId,
            date: new Date(new Date().toLocaleDateString())
        };
    });
};
var deleteOrder = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.order["delete"]({
                        where: {
                            id: id
                        }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var listOrders = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.order.findMany()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var listOrdersByClient = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.order.findMany({
                        where: { clientId: id }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var listOrdersByStatus = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var status, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = params.status;
                return [4 /*yield*/, prisma.order.findMany({})];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getOrder = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.order.findUniqueOrThrow({
                        where: {
                            id: id
                        }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var listOrdersBetweenDates = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var initDate, endDate, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                initDate = params.initDate, endDate = params.endDate;
                return [4 /*yield*/, prisma.order.findMany({
                        where: {
                            date: {
                                gte: new Date(initDate),
                                lte: new Date(endDate)
                            }
                        }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports["default"] = {
    createOrder: createOrder,
    deleteOrder: deleteOrder,
    listOrders: listOrders,
    getOrder: getOrder,
    listOrdersByClient: listOrdersByClient,
    listOrdersByStatus: listOrdersByStatus,
    listOrdersBetweenDates: listOrdersBetweenDates
};
//# sourceMappingURL=order.service.js.map