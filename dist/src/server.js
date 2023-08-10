"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var error_res_1 = __importDefault(require("./utils/error_res"));
var identity_1 = __importDefault(require("../src/routes/identity"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.disable("x-powered-by");
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/identify", identity_1.default);
app.use(function (req, res, next) {
    var error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use(function (error, req, res, next) {
    var errCode = error.status || 500;
    var errMsg = error.message || "Internal Server Error";
    return (0, error_res_1.default)(res, errCode, errMsg);
});
exports.default = app;
//# sourceMappingURL=server.js.map