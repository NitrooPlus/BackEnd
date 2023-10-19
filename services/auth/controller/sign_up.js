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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../../DB/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function sign_up(user) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((user === null || user === void 0 ? void 0 : user.phone) && (user === null || user === void 0 ? void 0 : user.first_name) && (user === null || user === void 0 ? void 0 : user.last_name) && (user === null || user === void 0 ? void 0 : user.hashed) && (user === null || user === void 0 ? void 0 : user.code))) {
                return { status: 400, content: { message: "تمام فیلد ها را پر کنید" } };
            }
            const check = yield bcrypt_1.default.compare(`${user.phone}${process.env.BCRYPT_KEY}${user.code}`, user.hashed);
            if (!check)
                return { status: 400, content: { message: "کد وارد شده اشتباه است" } };
            yield db_1.default.execute(`INSERT INTO user(last_name,first_name,phone)
          VALUES ('${user.last_name}','${user.first_name}','${user.phone}')`);
            const users = yield db_1.default.execute(`SELECT id,first_name,last_name,phone from user where phone='${user.phone}'`);
            if ((_a = users === null || users === void 0 ? void 0 : users[0]) === null || _a === void 0 ? void 0 : _a[0])
                return { status: 200, content: { user: users[0][0], token: jsonwebtoken_1.default.sign(Object.assign({}, users[0][0]), process.env.JWT_KEY || 'iust', { expiresIn: 60 * 60 * 24 * 30 }) } };
            else
                return {
                    status: 404,
                    content: { message: "مشکلی پیش آمده است" },
                };
        }
        catch (e) {
            return { status: 500, content: { message: "مشکلی پیش آمده است" } };
        }
    });
}
exports.default = sign_up;
