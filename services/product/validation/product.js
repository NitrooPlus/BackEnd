"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const url_1 = require("../../company/validation/url");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        return value;
    }),
    (0, class_validator_1.MaxLength)(100, { message: 'این فیلد نباید بیشتر از 100 حرف باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'لطفا این فیلد را پر کنید' }),
    (0, class_transformer_1.Expose)()
], Product.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        return value;
    }),
    (0, class_validator_1.Validate)(url_1.Url_validate),
    (0, class_validator_1.MaxLength)(80, { message: 'این فیلد نباید بیشتر از 100 حرف باشد' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'لطفا این فیلد را پر کنید' }),
    (0, class_transformer_1.Expose)()
], Product.prototype, "url", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        return value;
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'لطفا این فیلد را پر کنید' }),
    (0, class_transformer_1.Expose)()
], Product.prototype, "company_url", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        return value;
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'لطفا این فیلد را پر کنید' }),
    (0, class_transformer_1.Expose)()
], Product.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        return value;
    }),
    (0, class_transformer_1.Expose)()
], Product.prototype, "short_description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        return value;
    }),
    (0, class_transformer_1.Expose)()
], Product.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        return value;
    }),
    (0, class_transformer_1.Expose)()
], Product.prototype, "images", void 0);
exports.Product = Product = __decorate([
    (0, class_transformer_1.Exclude)()
], Product);
