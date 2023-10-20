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
const sign_up_1 = __importDefault(require("./controller/sign_up"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const verify_phone_1 = __importDefault(require("./controller/verify_phone"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const phone_1 = require("./validation/phone");
const transform_error_1 = __importDefault(require("../../helper/transform_error"));
const router = (0, express_1.Router)();
router.post('/send_code', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //validate user with validation schema start ...
    const obj = (0, class_transformer_1.plainToInstance)(phone_1.Phone, req.body);
    const err = yield (0, class_validator_1.validate)(obj);
    const errObj = (0, transform_error_1.default)(err);
    if ((_a = Object.keys(errObj)) === null || _a === void 0 ? void 0 : _a[0])
        return res.status(400).json(errObj);
    //end
    const token = 700000;
    let hashed = yield bcrypt_1.default.hash(`${req.body.phone}${process.env.BCRYPT_KEY}${token}`, 10);
    res.status(200).json({ hashed });
}));
router.post('/verify_phone', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, verify_phone_1.default)(req.body.phone, req.body.hashed, req.body.code);
    if (data.content.token) {
        let content = data.content;
        res.cookie(process.env.COOKIE_NAME || 'cookie', content.token, { httpOnly: true, expires: new Date(Date.now() + 900000000) });
        res.status(data.status).json(data.content);
    }
    else
        res.status(data.status).json(data.content);
}));
router.post('/sign_up', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, sign_up_1.default)(req.body);
    if (data.status == 200) {
        let content = data.content;
        res.cookie(process.env.COOKIE_NAME || 'cookie', content.token, { httpOnly: true, expires: new Date(Date.now() + 900000000) });
        res.status(data.status).json(data.content);
    }
    else
        res.status(data.status).json(data.content);
}));
router.get('/log_out', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie(process.env.COOKIE_NAME || 'cookie', 'deleted', { httpOnly: true });
    res.clearCookie(process.env.COOKIE_NAME || 'cookie', { httpOnly: true });
    res.json({ status: 'token deleted' });
    res.end();
}));
router.get('/get_user', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0");
    res.status(200).json(req.query.user);
    res.end();
}));
exports.default = router;
