"use strict";
//Transform Error of Class-Vlidator
Object.defineProperty(exports, "__esModule", { value: true });
function transform_error(errList) {
    const errObject = {};
    errList.forEach(e => {
        if (e.constraints && e.property)
            errObject[e.property] = Object.values(e.constraints)[0];
    });
    return errObject;
}
exports.default = transform_error;
