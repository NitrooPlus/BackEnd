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
function add_to_basket(user, product_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(user === null || user === void 0 ? void 0 : user.id))
                return { status: 403, content: { message: "شما توانایی این کار را ندارید" } };
            if (!product_id)
                return { status: 400, content: { message: "درخواست اشتباه است" } };
            yield db_1.default.execute(`INSERT INTO basket (user_id,product_id)
        VALUES(${user.id},${product_id})`);
            return { status: 200, content: { message: 'عملیات با موفقیت انجام شد' } };
        }
        catch (e) {
            return { status: 500, content: { message: "مشکلی پیش آمده است" } };
        }
    });
}
exports.default = add_to_basket;
