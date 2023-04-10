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
var getClientsWithDebths = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.client.findMany({
                    where: {
                        status: "DELAYED"
                    }
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, buildMessage(result)];
        }
    });
}); };
var buildMessage = function (result) {
    var resStr = "****Cuentas vencidas****\n";
    var counter = 0;
    if (result.length == 0)
        return "SIN ADEUDOS";
    for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
        var item = result_1[_i];
        counter++;
        resStr += counter + ". " + item.client.name + " \t $" + (item.total - item.payed) + "\n";
    }
    return resStr;
};
var createPayment = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, clientId, result, client, debt, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = body.amount, clientId = body.clientId;
                return [4 /*yield*/, prisma.payments.create({
                        data: {
                            amount: amount,
                            clientId: clientId
                        }
                    })];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, prisma.client.findUnique({
                        where: {
                            id: clientId
                        }
                    })];
            case 2:
                client = _a.sent();
                debt = Number(client === null || client === void 0 ? void 0 : client.debt) - amount;
                status = debt >= 0 ? "PAYED" : client === null || client === void 0 ? void 0 : client.status;
                return [4 /*yield*/, prisma.client.update({
                        where: { id: clientId },
                        data: {
                            status: status,
                            debt: debt
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updatePayment = function (body, params) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, orderId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = body.amount, orderId = body.orderId;
                return [4 /*yield*/, prisma.payments.update({
                        where: {
                            id: params.id
                        },
                        data: {
                            amount: amount
                        }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var deletePayment = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.payments["delete"]({
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
var listPayments = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.payments.findMany()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getPayment = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = params.id;
                return [4 /*yield*/, prisma.payments.findUniqueOrThrow({
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
var getPaymentsByClient = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var clientId, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clientId = params.clientId;
                return [4 /*yield*/, prisma.payments.findMany({
                        where: {
                            clientId: clientId
                        }
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports["default"] = {
    getClientsWithDebths: getClientsWithDebths,
    createPayment: createPayment,
    deletePayment: deletePayment,
    updatePayment: updatePayment,
    getPayment: getPayment,
    listPayments: listPayments,
    getPaymentsByClient: getPaymentsByClient
};
//# sourceMappingURL=payment.service.js.map