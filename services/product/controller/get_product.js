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
function get_product(url, company_url) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!url || !company_url)
                return { status: 400, content: { message: 'نام غرفه و محصول باید مشخص باشد' } };
            let data = yield db_1.default.execute(`SELECT p.*,c.url as company_url,c.title as company_name FROM products p
    JOIN company c
    ON c.id=p.company_id
    WHERE c.url='${company_url}' AND p.url='${url}'`);
            if ((_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a[0])
                return { status: 200, content: data[0][0] };
            else
                return { status: 404, content: { message: 'غرفه یافت نشد' } };
        }
        catch (e) {
            console.log(e);
            return { status: 500, content: { message: "مشکلی پیش آمده است" } };
        }
    });
}
exports.default = get_product;
