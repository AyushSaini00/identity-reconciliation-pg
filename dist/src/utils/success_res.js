"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var success_res = function (response, data, message, status_code) {
    if (data === void 0) { data = {}; }
    if (message === void 0) { message = ""; }
    if (status_code === void 0) { status_code = 200; }
    return response.status(status_code).json({
        status: "success",
        message: message,
        data: data,
    });
};
exports.default = success_res;
//# sourceMappingURL=success_res.js.map