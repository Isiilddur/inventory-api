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
var prisma = new client_1.PrismaClient();
var ordesToReceive = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
var incomeByDate = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var initDate, endDate, payed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                initDate = params.initDate, endDate = params.endDate, payed = params.payed;
                if (!payed) return [3 /*break*/, 2];
                return [4 /*yield*/, prisma.order.aggregate({
                        _sum: {
                            total: true
                        },
                        where: {
                            AND: {
                                date: {
                                    gte: new Date(initDate),
                                    lte: new Date(endDate)
                                }
                            }
                        }
                    })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, prisma.order.aggregate({
                    _sum: {
                        total: true
                    },
                    where: {
                        date: {
                            gte: new Date(initDate),
                            lte: new Date(endDate)
                        }
                    }
                })];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var dataByStore = function (query, params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, range, date1, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                range = query.range;
                date1 = new Date().toLocaleDateString();
                if (range === "WEEK") {
                    date1 = getMonday().toLocaleDateString();
                }
                return [4 /*yield*/, prisma.order.aggregate({
                        where: {
                            AND: {
                                storeId: id,
                                date: {
                                    gte: new Date(date1),
                                    lte: getSunday()
                                }
                            }
                        },
                        _sum: {
                            total: true
                        }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getDate = function (range) {
    var date = new Date();
    var temp;
    switch (range) {
        case "WEEK":
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var endMonth = month == 12 ? 1 : month + 1;
            var endYear = endMonth == 12 ? year + 1 : year;
            var initDate = year.toString() + "-" + month.toString() + "-" + "1";
            var endDate = endYear.toString() + "-" + endMonth.toString() + "-" + "1";
            return [initDate, endDate];
            break;
        case "YEAR":
            var year2 = date.getFullYear();
            var endYear2 = year2 + 1;
            var initDate2 = year2.toString() + "-01-1";
            var endDate2 = endYear2.toString() + "-01-1";
            return [initDate2, endDate2];
        default:
            console.log("AQUI");
            return ["2022-01-01", date.toLocaleDateString()];
            break;
    }
};
var getMonday = function () {
    var dt = new Date();
    while (dt.getDay() != 1) {
        dt.setDate(dt.getDate() - 1);
    }
    return dt;
};
var getSunday = function () {
    var dt = new Date();
    while (dt.getDay() != 0) {
        dt.setDate(dt.getDate() + 1);
    }
    return dt;
};
var deleteClient = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.client["delete"]({
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
var listClients = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.client.findMany()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getClient = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.client.findUniqueOrThrow({
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
var getMoneyByCategoryAndDay = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var date1, range, date, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date1 = new Date().toLocaleDateString();
                range = query.range;
                if (range === "WEEK") {
                    date1 = getMonday().toLocaleDateString();
                }
                date = new Date().toLocaleDateString();
                return [4 /*yield*/, prisma.products_on_orders.groupBy({
                        by: ["categoryId"],
                        _sum: {
                            price: true
                        },
                        where: {
                            date: {
                                gte: new Date(date1),
                                lte: getSunday()
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
    ordesToReceive: ordesToReceive,
    incomeByDate: incomeByDate,
    dataByStore: dataByStore,
    getMoneyByCategoryAndDay: getMoneyByCategoryAndDay
};
//# sourceMappingURL=dashboard.service.js.map