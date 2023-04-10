'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("../routes/routes"));
var cors_1 = __importDefault(require("cors"));
var cron = __importStar(require("node-cron"));
var twilio_service_1 = __importDefault(require("../services/twilio.service"));
var Server = /** @class */ (function () {
    function Server() {
        /*   task = cron.schedule("00 11 * * *", ()=> {
              console.log("Executing...")
              twilioService.getMessageToSend()
     
         }) */
        this.task = cron.schedule("*/1 * * * *", function () {
            console.log("Executing...");
            twilio_service_1["default"].getMessageToSend();
        });
        this.app = (0, express_1["default"])();
        this.PORT = 3030;
        //this.app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000 }));
        //this.app.use(express.json({ limit: "50mb", parameterLimit: 500000000 }));
        this.middlewares();
        this.routesConfig();
        //this.task.start()
    }
    Server.prototype.middlewares = function () {
        // CORS
        this.app.use((0, cors_1["default"])());
        // Read and Parse of body
        this.app.use(express_1["default"].json());
    };
    Server.prototype.routesConfig = function () {
        this.app.use('/api/v1', routes_1["default"]);
    };
    Server.prototype.startListen = function () {
        var _this = this;
        this.app.listen(this.PORT, function () {
            console.log("Aplicaci\u00F3n corriendo en puerto ".concat(_this.PORT));
        });
    };
    return Server;
}());
exports["default"] = Server;
//# sourceMappingURL=server.js.map