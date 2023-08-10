"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_res = function (response, status_code, message, data) {
    if (status_code === void 0) { status_code = 400; }
    if (message === void 0) { message = ""; }
    if (data === void 0) { data = {}; }
    return response.status(status_code).json({
        status: "error",
        message: message,
        data: data,
    });
};
exports.default = error_res;
//# sourceMappingURL=error_res.js.map