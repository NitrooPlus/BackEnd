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
    users: [{ id: 12, first_name: 'f1', last_name: 'l2', phone: '09111111111' }],
    companies: [{
            "title": "برنز زرین",
            "url": "bronzi",
            "location": "تهران",
            "description": "متن تست"
        }]
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.execute(`delete from user`);
    yield db_1.default.execute(`delete from company`);
    yield db_1.default.execute(`INSERT INTO user (id,first_name,last_name,phone) VALUES ${[testData.users.map(u => '(' + [u.id, `'${u.first_name}'`, `'${u.last_name}'`, `'${u.phone}'`].join(',') + ')')].join(',')}`);
    yield db_1.default.execute(`INSERT INTO company (title,url,location,description,for_user) VALUES ${[testData.companies.map(u => '(' + [`'${u.title}'`, `'${u.url}'`, `'${u.location}'`, `'${u.description}'`, 12].join(',') + ')')].join(',')}`);
}));
describe('/company', () => {
    it('Bad request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/company/get_company_information');
        expect(response.status).toBe(400);
    }));
    it('NOT found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/company/get_company_information').query({ url: ':)' });
        expect(response.status).toBe(404);
    }));
    it('correct get request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/company/get_company_information').query({ url: testData.companies[0].url });
        expect(response._body).toEqual(expect.objectContaining({
            "title": testData.companies[0].title,
            "url": testData.companies[0].url,
            "description": testData.companies[0].description,
            "logo": null,
            "product_count": 0
        }));
        expect(response.status).toBe(200);
    }));
});
