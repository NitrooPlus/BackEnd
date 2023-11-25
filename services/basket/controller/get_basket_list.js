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
function get_basket_list(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(user === null || user === void 0 ? void 0 : user.id))
                return { status: 403, content: { message: "شما توانایی این کار را ندارید" } };
            let data = yield db_1.default.execute(`SELECT c.title as company_title,c.url as company_url,p.images,p.price,p.url,p.title,p.id,count(p.id) as counts from basket b
        join products p 
        on p.id=b.product_id
        join company c
        on p.company_id=c.id
        group by p.id`);
            return { status: 200, content: (data === null || data === void 0 ? void 0 : data[0]) || [] };
        }
        catch (e) {
            return { status: 500, content: { message: "مشکلی پیش آمده است" } };
        }
    });
}
exports.default = get_basket_list;
