"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone_number = void 0;
const class_validator_1 = require("class-validator");
let Phone_number = class Phone_number {
    validate(text, args) {
        const numbers = /^[0-9]+$/;
        if (!text)
            return true;
        return (text === null || text === void 0 ? void 0 : text.match(numbers)) && (text === null || text === void 0 ? void 0 : text.length) == 11 && text[0] == '0' && text[1] == '9' ? true : false; // for async validations you must return a Promise<boolean> here
    }
    defaultMessage(args) {
        // here you can provide default error message if validation failed
        return 'شماره همراه باید 11 رقمی باشد و با 09 شروع شود';
    }
};
exports.Phone_number = Phone_number;
exports.Phone_number = Phone_number = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'PhoneNum', async: false })
], Phone_number);
