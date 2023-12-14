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
const search_algorithm_1 = __importDefault(require("../helper/search_algorithm"));
function search_company(query, skip, count) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (query) {
                let a = (0, search_algorithm_1.default)(query);
                let company_list = yield db_1.default.query(`SELECT title,url,location
          FRom company 
          WHERE  MATCH(title)
          AGAINST('${a}' IN BOOLEAN MODE)
          Limit ${skip},${count}`);
                company_list = ((_a = company_list === null || company_list === void 0 ? void 0 : company_list[0]) === null || _a === void 0 ? void 0 : _a.length) > 0 ? company_list === null || company_list === void 0 ? void 0 : company_list[0] : [];
                return { status: 200, content: company_list };
            }
            else {
                let company_list = yield db_1.default.query(`SELECT title,url,location
          FRom company 
          Limit ${skip},${count}
          `);
                company_list = ((_b = company_list === null || company_list === void 0 ? void 0 : company_list[0]) === null || _b === void 0 ? void 0 : _b.length) > 0 ? company_list === null || company_list === void 0 ? void 0 : company_list[0] : [];
                return { status: 200, content: company_list };
            }
        }
        catch (e) {
            console.log(e);
            return { status: 500, content: { message: "مشکلی پیش آمده است" } };
        }
    });
}
exports.default = search_company;
