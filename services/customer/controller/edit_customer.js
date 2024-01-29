"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../DB/db"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const transform_error_1 = __importDefault(require("../../../helper/transform_error"));
const user_1 = require("../../auth/validation/user");
function edit_customer(body, user) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(user === null || user === void 0 ? void 0 : user.id))
                return { status: 403, content: { message: "شما توانایی این کار را ندارید" } };
            let keys = Object.keys(body);
            let localuser = user;
            keys.forEach(k => {
                localuser[k] = body[k];
            });
            //validate customer with validation schema start ...
            const obj = (0, class_transformer_1.plainToInstance)(user_1.User, localuser);
            const err = yield (0, class_validator_1.validate)(obj);
            const errObj = (0, transform_error_1.default)(err);
            if ((_a = Object.keys(errObj)) === null || _a === void 0 ? void 0 : _a[0])
                return ({ status: 400, content: errObj });
            yield db_1.default.execute(`UPDATE user
    SET first_name = '${localuser.first_name}', last_name = '${localuser.last_name}',  phone = '${localuser.phone}'
    WHERE id = ${localuser.id};`);
            return { status: 200, content: { message: 'عملیات با موفقیت انجام شد' } };
        }
        catch (e) {
            console.log(e.message);
            if (((_b = e === null || e === void 0 ? void 0 : e.message) === null || _b === void 0 ? void 0 : _b.indexOf("user.phone_unique")) >= 0)
                return { status: 400, content: { title: 'شماره تلفن تکراری است' } };
            return { status: 500, content: { message: "مشکلی پیش آمده است" } };
        }
    });
}
exports.default = edit_customer;
