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
    users: [{ first_name: 'f1', last_name: 'l2', phone: '09396077497', wrong_hashed: 'dddddd', code: 700000 }]
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('verify_phone');
    yield db_1.default.execute(`delete from user`);
    yield db_1.default.execute(`INSERT INTO user (first_name,last_name,phone) VALUES ${[testData.users.map(u => '(' + [`'${u.first_name}'`, `'${u.last_name}'`, `'${u.phone}'`].join(',') + ')')].join(',')}`);
}));
describe('/verify_phone', () => {
    it('Bad request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/verify_phone');
        expect(response._body).toEqual({ message: "درخواست اشتباه است" });
        expect(response.status).toBe(400);
    }));
    it('wrong hashed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/verify_phone').send({ phone: testData.users[0].phone, code: testData.users[0].code, hashed: testData.users[0].wrong_hashed });
        expect(response._body).toEqual({ message: "کد وارد شده اشتباه است" });
        expect(response.status).toBe(400);
    }));
    it('correct login', () => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.execute(`delete from user`);
        yield db_1.default.execute(`INSERT INTO user (first_name,last_name,phone) VALUES ${[testData.users.map(u => '(' + [`'${u.first_name}'`, `'${u.last_name}'`, `'${u.phone}'`].join(',') + ')')].join(',')}`);
        const response = yield request.post('/auth/send_code').send({ phone: '09396077497' });
        const response_user = yield request.post('/auth/verify_phone').send({ phone: testData.users[0].phone, code: testData.users[0].code, hashed: response._body.hashed });
        expect(response_user._body).toHaveProperty('token');
        expect(response_user._body.user).toEqual(expect.objectContaining({
            first_name: 'f1',
            last_name: 'l2',
            phone: '09396077497'
        }));
        expect(response.status).toBe(200);
    }));
    it('correct signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/send_code').send({ phone: '09399999999' });
        const response_user = yield request.post('/auth/verify_phone').send({ phone: '09399999999', code: testData.users[0].code, hashed: response._body.hashed });
        expect(response_user._body).toEqual({ sign_up: true });
        expect(response.status).toBe(200);
    }));
});
