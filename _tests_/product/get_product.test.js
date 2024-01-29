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
const get_product_1 = __importDefault(require("../../services/product/controller/get_product"));
describe("/get_product", () => {
    it("Bad request", () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, get_product_1.default)("", "");
        expect(response).toEqual({
            status: 400,
            content: { message: "نام غرفه و محصول باید مشخص باشد" },
        });
    }));
    it("Correct request", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.default.execute = jest.fn().mockResolvedValue([[1]]);
        const response = yield (0, get_product_1.default)("correct value", "correct value");
        expect(response).toEqual({ status: 200, content: 1 });
    }));
    it("Not found", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.default.execute = jest.fn().mockResolvedValue([]);
        const response = yield (0, get_product_1.default)("correct value", "correct value");
        expect(response).toEqual({
            status: 404,
            content: { message: "محصول یافت نشد" },
        });
    }));
    it("Internal error", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.default.execute = jest.fn().mockRejectedValue(new Error());
        const response = yield (0, get_product_1.default)("wrong value", "wrong value");
        expect(response).toEqual({
            status: 500,
            content: { message: "مشکلی پیش آمده است" },
        });
    }));
});
