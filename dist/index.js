"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require('dotenv').config();
var server_1 = __importDefault(require("./models/server"));
var server = new server_1["default"]();
server.startListen();
//# sourceMappingURL=index.js.map