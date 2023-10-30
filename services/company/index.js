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
const express_1 = require("express");
const get_company_information_1 = __importDefault(require("./controller/get_company_information"));
const delete_company_1 = __importDefault(require("./controller/delete_company"));
const create_company_1 = __importDefault(require("./controller/create_company"));
const router = (0, express_1.Router)();
router.get('/get_company_information', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.query;
    let data = yield (0, get_company_information_1.default)(request.url);
    res.status(data.status).json(data.content);
}));
router.delete('/delete_company', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.query;
    let data = yield (0, delete_company_1.default)(request.url, request.user);
    res.status(data.status).json(data.content);
}));
router.post('/create_company', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.query;
    let data = yield (0, create_company_1.default)(req.body, request.user);
    res.status(data.status).json(data.content);
}));
exports.default = router;
