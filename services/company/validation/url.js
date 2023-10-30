"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url_validate = void 0;
const class_validator_1 = require("class-validator");
let Url_validate = class Url_validate {
    validate(text, args) {
        const regex = /^[a-zA-Z0-9_]+$/;
        if (!text)
            return true;
        return (text === null || text === void 0 ? void 0 : text.match(regex)) ? true : false; // for async validations you must return a Promise<boolean> here
    }
    defaultMessage(args) {
        // here you can provide default error message if validation failed
        return 'url فقط میتواند دارای حروف انگلیسی یا اعداد و یا _ باشد';
    }
};
exports.Url_validate = Url_validate;
exports.Url_validate = Url_validate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'PhoneNum', async: false })
], Url_validate);
