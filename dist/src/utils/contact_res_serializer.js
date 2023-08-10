"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contact_res_serializer = function (contactProps) {
    var primaryContatctId = contactProps.primaryContatctId, emails = contactProps.emails, phoneNumbers = contactProps.phoneNumbers, secondaryContactIds = contactProps.secondaryContactIds;
    return {
        contact: {
            primaryContatctId: primaryContatctId,
            emails: non_null_unique_values(emails),
            phoneNumbers: non_null_unique_values(phoneNumbers),
            secondaryContactIds: non_null_unique_values(secondaryContactIds),
        },
    };
};
exports.default = contact_res_serializer;
var non_null_unique_values = function (array) {
    if (array === void 0) { array = []; }
    return array.filter(function (el, ind, arr) { return el !== null && arr.indexOf(el) === ind; });
};
//# sourceMappingURL=contact_res_serializer.js.map