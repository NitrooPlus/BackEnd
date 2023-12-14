"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function serach_algorithm(query) {
    let array = query.split(' ');
    array = array === null || array === void 0 ? void 0 : array.map(e => {
        if (e) {
            if (e[0] == 'آ') {
                const replaced = 'ا' + e.substring(1);
                return '+(>' + e + '*' + ' <' + replaced + '*' + ')';
            }
            if (e[0] == 'ا') {
                const replaced = 'آ' + e.substring(1);
                return '+(>' + e + '*' + ' <' + replaced + '*' + ')';
            }
            return '+' + e + '*';
        }
    });
    return array.join(" ");
}
exports.default = serach_algorithm;
