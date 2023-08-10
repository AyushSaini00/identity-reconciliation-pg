"use strict";
/*
- this function finds primary contact using either id, email or phoneNumber
- it also finds all of the existing secondary contacts linked to primary account
- returns all contacts with primary being the first element
*/
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var create_new_contact_1 = __importDefault(require("./create_new_contact"));
var create_contact_1 = __importDefault(require("./db/create_contact"));
var find_contacts_1 = __importDefault(require("./db/find_contacts"));
var update_contact_1 = __importDefault(require("./db/update_contact"));
var get_secondary_contacts_1 = __importDefault(require("./get_secondary_contacts"));
var find_or_create_primary_and_return_all_contacts = function (_a) {
    var id = _a.id, email = _a.email, phoneNumber = _a.phoneNumber;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, allRelatedContacts, allRelatedContactsError, primaryContacts, idOfPrimary, _c, primaryContactData, primaryContactError, primaryContact_1, _d, newSecondaryContactData, newSecondaryContactError, _e, data, error, primaryContact_2, latestPrimary, _f, updatedLatestPrimary, updatedLatestPrimaryError, _g, newSecondaryContactData, newSecondaryContactError, _h, data, error, primaryContact, _j, newSecondaryContactData, newSecondaryContactError, _k, data, error, err_1;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _l.trys.push([0, 15, , 16]);
                    return [4 /*yield*/, (0, find_contacts_1.default)({
                            id: id,
                            email: email,
                            phoneNumber: phoneNumber,
                        })];
                case 1:
                    _b = _l.sent(), allRelatedContacts = _b.data, allRelatedContactsError = _b.error;
                    if (allRelatedContactsError) {
                        return [2 /*return*/, { error: allRelatedContactsError }];
                    }
                    if (!!allRelatedContacts) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, create_new_contact_1.default)({ email: email, phoneNumber: phoneNumber })];
                case 2: return [2 /*return*/, _l.sent()];
                case 3:
                    if (!allRelatedContacts) return [3 /*break*/, 14];
                    primaryContacts = allRelatedContacts.filter(function (el) { return el.linkPrecedence === "primary"; });
                    if (!!primaryContacts.length) return [3 /*break*/, 7];
                    idOfPrimary = allRelatedContacts[0].linkedId;
                    return [4 /*yield*/, (0, find_contacts_1.default)({
                            id: idOfPrimary,
                        })];
                case 4:
                    _c = _l.sent(), primaryContactData = _c.data, primaryContactError = _c.error;
                    if (primaryContactError) {
                        return [2 /*return*/, { error: primaryContactError }];
                    }
                    if (!primaryContactData) {
                        return [2 /*return*/, {
                                code: 400,
                                detail: "primary contact not found",
                            }];
                    }
                    if (!primaryContactData) return [3 /*break*/, 7];
                    primaryContact_1 = primaryContactData[0];
                    return [4 /*yield*/, (0, create_contact_1.default)({
                            email: email,
                            phoneNumber: phoneNumber,
                            linkedId: primaryContact_1.id,
                            linkPrecedence: "secondary",
                        })];
                case 5:
                    _d = _l.sent(), newSecondaryContactData = _d.data, newSecondaryContactError = _d.error;
                    if (newSecondaryContactError) {
                        return [2 /*return*/, { error: newSecondaryContactError }];
                    }
                    if (!newSecondaryContactData) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, get_secondary_contacts_1.default)(primaryContact_1.id)];
                case 6:
                    _e = _l.sent(), data = _e.data, error = _e.error;
                    if (error) {
                        return [2 /*return*/, error];
                    }
                    if (data) {
                        return [2 /*return*/, { data: __spreadArray([primaryContact_1], data, true) }];
                    }
                    _l.label = 7;
                case 7:
                    if (!(primaryContacts.length > 1)) return [3 /*break*/, 11];
                    primaryContact_2 = primaryContacts[0];
                    latestPrimary = primaryContacts.slice(-1)[0];
                    return [4 /*yield*/, (0, update_contact_1.default)(latestPrimary.id, {
                            linkedId: primaryContact_2.id,
                            linkPrecedence: "secondary",
                        })];
                case 8:
                    _f = _l.sent(), updatedLatestPrimary = _f.data, updatedLatestPrimaryError = _f.error;
                    if (updatedLatestPrimaryError) {
                        return [2 /*return*/, { error: updatedLatestPrimaryError }];
                    }
                    if (!updatedLatestPrimary) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, create_contact_1.default)({
                            email: email,
                            phoneNumber: phoneNumber,
                            linkedId: primaryContact_2.id,
                            linkPrecedence: "secondary",
                        })];
                case 9:
                    _g = _l.sent(), newSecondaryContactData = _g.data, newSecondaryContactError = _g.error;
                    if (newSecondaryContactError) {
                        return [2 /*return*/, { error: newSecondaryContactError }];
                    }
                    if (!newSecondaryContactData) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, get_secondary_contacts_1.default)(primaryContact_2.id)];
                case 10:
                    _h = _l.sent(), data = _h.data, error = _h.error;
                    if (error) {
                        return [2 /*return*/, error];
                    }
                    if (data) {
                        return [2 /*return*/, { data: __spreadArray([primaryContact_2], data, true) }];
                    }
                    _l.label = 11;
                case 11:
                    primaryContact = primaryContacts[0];
                    if (!primaryContact) return [3 /*break*/, 14];
                    return [4 /*yield*/, (0, create_contact_1.default)({
                            email: email,
                            phoneNumber: phoneNumber,
                            linkedId: primaryContact.id,
                            linkPrecedence: "secondary",
                        })];
                case 12:
                    _j = _l.sent(), newSecondaryContactData = _j.data, newSecondaryContactError = _j.error;
                    if (newSecondaryContactError) {
                        return [2 /*return*/, { error: newSecondaryContactError }];
                    }
                    if (!newSecondaryContactData) return [3 /*break*/, 14];
                    return [4 /*yield*/, (0, get_secondary_contacts_1.default)(primaryContact.id)];
                case 13:
                    _k = _l.sent(), data = _k.data, error = _k.error;
                    if (error) {
                        return [2 /*return*/, error];
                    }
                    if (data) {
                        return [2 /*return*/, { data: __spreadArray([primaryContact], data, true) }];
                    }
                    _l.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    err_1 = _l.sent();
                    console.log("find_primary_and_return_all_contacts error : ".concat(err_1));
                    return [2 /*return*/, {
                            error: {
                                code: 400,
                                detail: "failed to find primary and secondaries",
                                err: err_1,
                            },
                        }];
                case 16: return [2 /*return*/];
            }
        });
    });
};
exports.default = find_or_create_primary_and_return_all_contacts;
//# sourceMappingURL=find_or_create_primary_and_return_all_contacts.js.map