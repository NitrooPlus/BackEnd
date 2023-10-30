"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const phone_number_1 = require("./phone_number");
let Phone = class Phone {
};
exports.Phone = Phone;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        return value;
    }),
    (0, class_validator_1.Validate)(phone_number_1.Phone_number),
    (0, class_validator_1.IsNotEmpty)({ message: 'لطفا این فیلد را پر کنید' }),
    (0, class_transformer_1.Expose)()
], Phone.prototype, "phone", void 0);
exports.Phone = Phone = __decorate([
    (0, class_transformer_1.Exclude)()
], Phone);
