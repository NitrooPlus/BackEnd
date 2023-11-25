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
function delete_product(url, user, company_url) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(user === null || user === void 0 ? void 0 : user.id))
                return { status: 403, content: { message: "شما توانایی این کار را ندارید" } };
            if (!url || !company_url)
                return { status: 400, content: 'نام غرفه و محصول باید مشخص باشد' };
            const company = yield db_1.default.execute(`SELECT id from company where for_user=${user.id} AND url='${company_url}'`);
            if (!((_b = (_a = company === null || company === void 0 ? void 0 : company[0]) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id))
                return { status: 403, content: { message: "شما توانایی این کار را ندارید" } };
            yield db_1.default.execute(`DELETE FROM 
    products c
    where c.url='${url}' AND company_id=${company[0][0].id}`);
            return { status: 200, content: { message: 'عملیات با موفقیت انجام شد' } };
        }
        catch (e) {
            console.log(e);
            return { status: 500, content: { message: "مشکلی پیش آمده است" } };
        }
    });
}
exports.default = delete_product;
