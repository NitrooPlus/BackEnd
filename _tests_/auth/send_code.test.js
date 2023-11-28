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
// let testData={
//   users:[{first_name:'f1',last_name:'f2',phone:'09396077497'}]
// }
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.execute(`delete from user where NOT id=0`);
    // await db.execute(`INSERT INTO user (first_name,last_name,phone) VALUES ${[testData.users.map(u =>'('+ [`'${u.first_name}'`,`'${u.last_name}'`,`'${u.phone}'`].join(',')+')')].join(',')}`);
}));
describe('/send_code', () => {
    it('Bad request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/send_code');
        console.log(response._body);
        expect(response._body).toEqual({
            phone: 'لطفا این فیلد را پر کنید'
        });
        expect(response.status).toBe(400);
    }));
    it('wrong phone number', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/send_code').send({ phone: '09' });
        console.log(response._body);
        expect(response._body).toEqual({
            phone: 'شماره همراه باید 11 رقمی باشد و با 09 شروع شود'
        });
        expect(response.status).toBe(400);
    }));
    it('correct phone number', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/auth/send_code').send({ phone: '09396077497' });
        console.log(response._body);
        expect(response._body).toHaveProperty('hashed');
        expect(response.status).toBe(200);
    }));
});
