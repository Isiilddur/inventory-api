"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var validateJWT = function (req, res, next) {
    if (res === void 0) { res = express_1.response; }
    var token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ ok: false, msg: "No autorizado" });
    }
    try {
        var _a = jwt_simple_1["default"].decode(token, process.env.SECRET_JWT_SEED, false, 'HS256'), username = _a.username, role = _a.role;
        next();
    }
    catch (error) {
        return res.status(401).json({ ok: false, msg: "Token no valido" });
    }
};
exports["default"] = validateJWT;
//# sourceMappingURL=validate-jwt.js.map