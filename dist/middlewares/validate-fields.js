"use strict";
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var validateFields = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports["default"] = validateFields;
//# sourceMappingURL=validate-fields.js.map