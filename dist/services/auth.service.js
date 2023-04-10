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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var moment_1 = __importDefault(require("moment"));
var prisma = new client_1.PrismaClient();
var login = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, user, validPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = body.username, password = body.password;
                return [4 /*yield*/, prisma.user.findUniqueOrThrow({
                        where: {
                            username: username
                        }
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user === null || user === void 0 ? void 0 : user.password)];
            case 2:
                validPassword = _a.sent();
                console.log(validPassword);
                if (!validPassword) {
                    throw new Error("Invalid User");
                }
                else
                    return [2 /*return*/, { jwt: generateJWT(user.id, user.username, user.role) }];
                return [2 /*return*/];
        }
    });
}); };
var createUser = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, name, phone, role, salt, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = body.username, password = body.password, name = body.name, phone = body.phone, role = body.role;
                salt = bcryptjs_1["default"].genSaltSync();
                password = bcryptjs_1["default"].hashSync(password, salt);
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            username: username,
                            password: password,
                            name: name,
                            phone: phone,
                            role: role
                        }
                    })["catch"](function (e) { throw e; })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, { jwt: generateJWT(user.id, username, user.role), msg: "Usuario registrado correctamente" }];
        }
    });
}); };
var generateJWT = function (uid, username, role) {
    if (uid === void 0) { uid = ""; }
    var payload = {
        uid: uid,
        username: username,
        role: role,
        iat: (0, moment_1["default"])().unix(),
        exp: (0, moment_1["default"])().add(1, "hour").unix()
    };
    return jwt_simple_1["default"].encode(payload, process.env.SECRET_JWT_SEED, "HS256");
};
exports["default"] = { login: login, createUser: createUser };
//# sourceMappingURL=auth.service.js.map