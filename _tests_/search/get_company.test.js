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
const db_1 = __importDefault(require("../../DB/db"));
const get_company_1 = __importDefault(require("../../services/search/controller/get_company"));
describe("/search_company", () => {
    it("Correct request", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.default.query = jest.fn().mockResolvedValue([[1]]);
        const response = yield (0, get_company_1.default)("correct value", 0, 0);
        expect(response).toEqual({ status: 200, content: [1] });
    }));
    it("Internal error", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.default.query = jest.fn().mockRejectedValue(new Error());
        const response = yield (0, get_company_1.default)("wrong value", 1, 1);
        expect(response).toEqual({
            status: 500,
            content: { message: "مشکلی پیش آمده است" },
        });
    }));
});
