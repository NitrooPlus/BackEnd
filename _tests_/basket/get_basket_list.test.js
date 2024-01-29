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
const get_basket_list_1 = __importDefault(require("../../services/basket/controller/get_basket_list"));
describe("/get_basket_list", () => {
    it("unAuthorized request", () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, get_basket_list_1.default)({});
        expect(response).toEqual({
            status: 403,
            content: { message: "شما توانایی این کار را ندارید" },
        });
    }));
    it("Correct request", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.default.execute = jest.fn().mockResolvedValue([]);
        let response = yield (0, get_basket_list_1.default)({ id: 1 });
        expect(response).toEqual({
            status: 200,
            content: [],
        });
    }));
    it("Internal error", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.default.execute = jest.fn().mockRejectedValue(new Error());
        let response = yield (0, get_basket_list_1.default)({ id: 1 });
        expect(response).toEqual({
            status: 500,
            content: { message: "مشکلی پیش آمده است" },
        });
    }));
});
