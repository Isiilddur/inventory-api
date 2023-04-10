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
exports.__esModule = true;
var client_1 = require("@prisma/client");
var runtime_1 = require("@prisma/client/runtime");
var prisma = new client_1.PrismaClient();
var createProduct = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.product.create({
                    data: body
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updateProduct = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var name, categoryId, storeId, id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = body.name, categoryId = body.categoryId, storeId = body.storeId, id = body.id;
                return [4 /*yield*/, prisma.product.update({
                        where: {
                            id: id
                        },
                        data: {
                            name: name,
                            storeId: storeId,
                            categoryId: categoryId
                        }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var deleteProduct = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.product["delete"]({
                        where: { id: id }
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
            case 3:
                error_1 = _a.sent();
                throw new Error("Este producto está relacionado a mas ordenes");
            case 4: return [2 /*return*/];
        }
    });
}); };
var findProduct = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.product.findUnique({
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
var listProducts = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(params);
                query = generateQuery(params);
                console.log(query);
                return [4 /*yield*/, prisma.product.findMany(query)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var listProductsInOrder = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.products_on_orders.findMany({
                        where: { orderId: id }, include: { product: true }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var increaseStock = function (body, params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, amount, query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                amount = body.amount;
                query = generateQuery(params);
                console.log(query);
                return [4 /*yield*/, prisma.product.findUniqueOrThrow({
                        where: {
                            id: id
                        }
                    })];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, prisma.product.update({
                        data: { stock: new runtime_1.Decimal(result === null || result === void 0 ? void 0 : result.stock).plus(amount) },
                        where: { id: id }
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var decreaseStock = function (id, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var result, decimalAmount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.product.findUniqueOrThrow({
                    where: {
                        id: id
                    }
                })];
            case 1:
                result = _a.sent();
                decimalAmount = new runtime_1.Decimal(result === null || result === void 0 ? void 0 : result.stock).minus(amount);
                return [4 /*yield*/, prisma.product.update({
                        data: { stock: decimalAmount },
                        where: { id: id }
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, decimalAmount];
        }
    });
}); };
var generateQuery = function (params) {
    debugger;
    var storeId = params.storeId, categoryId = params.categoryId;
    console.log(storeId, categoryId);
    var query = {};
    if (!storeId && !categoryId) {
        return query;
    }
    if (storeId && categoryId) {
        query = {
            where: {
                AND: {
                    storeId: storeId,
                    categoryId: categoryId
                }
            }
        };
    }
    else if (storeId) {
        query = {
            where: {
                storeId: storeId
            }
        };
    }
    else if (categoryId) {
        query = {
            where: {
                categoryId: categoryId
            }
        };
    }
    console.log(query);
    return query;
};
exports["default"] = {
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    findProduct: findProduct,
    listProducts: listProducts,
    increaseStock: increaseStock,
    decreaseStock: decreaseStock,
    listProductsInOrder: listProductsInOrder
};
//# sourceMappingURL=product.service.js.map