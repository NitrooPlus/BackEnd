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
require('dotenv').config();
const db_1 = __importDefault(require("../../DB/db"));
require("jest-extended");
let request = require('supertest');
request = request(`http://localhost:${process.env.PORT}`);
let testData = {
    users: [{ first_name: 'f1', last_name: 'l2', phone: '09399999998', wrong_hashed: 'dddddd', code: 700000 }]
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('sign_up');
    yield db_1.default.execute(`delete from user`);
}));
describe('/sign_up', () => {
    it('Bad request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/sign_up');
        expect(response._body).toEqual({ phone: 'لطفا این فیلد را پر کنید', first_name: 'لطفا این فیلد را پر کنید', last_name: 'لطفا این فیلد را پر کنید' });
        expect(response.status).toBe(400);
    }));
    it('wrong hashed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/sign_up').send({ phone: testData.users[0].phone, code: testData.users[0].code, hashed: testData.users[0].wrong_hashed, first_name: testData.users[0].first_name, last_name: testData.users[0].last_name });
        expect(response._body).toEqual({ message: "کد وارد شده اشتباه است" });
        expect(response.status).toBe(400);
    }));
    it('correct sign_up sign_up', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/send_code').send({ phone: testData.users[0].phone });
        const response_user = yield request.post('/auth/sign_up').send({ phone: testData.users[0].phone, code: testData.users[0].code, hashed: response._body.hashed, first_name: testData.users[0].first_name, last_name: testData.users[0].last_name });
        expect(response_user._body).toHaveProperty('token');
        expect(response_user._body.user).toEqual(expect.objectContaining({
            first_name: 'f1',
            last_name: 'l2',
            phone: testData.users[0].phone
        }));
        expect(response.status).toBe(200);
    }));
    it('correct get_user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/send_code').send({ phone: testData.users[0].phone });
        const response_user = yield request.post('/auth/verify_phone').send({ phone: testData.users[0].phone, code: testData.users[0].code, hashed: response._body.hashed });
        const data = yield request.get('/auth/get_user').set('Cookie', `${process.env.COOKIE_NAME}=${response_user._body.token}`);
        expect(data._body).toEqual(expect.objectContaining({
            first_name: 'f1',
            last_name: 'l2',
            phone: testData.users[0].phone
        }));
        expect(response.status).toBe(200);
    }));
});
