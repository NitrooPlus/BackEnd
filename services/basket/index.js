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
const add_to_basket_1 = __importDefault(require("./controller/add_to_basket"));
const delete_from_basket_1 = __importDefault(require("./controller/delete_from_basket"));
const get_basket_list_1 = __importDefault(require("./controller/get_basket_list"));
const checkout_1 = __importDefault(require("./controller/checkout"));
const router = (0, express_1.Router)();
router.get('/get_basket_list', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.query;
    let data = yield (0, get_basket_list_1.default)(request.user);
    res.status(data.status).json(data.content);
}));
router.post('/add_to_basket', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.query;
    let data = yield (0, add_to_basket_1.default)(request.user, req.body.product_id);
    res.status(data.status).json(data.content);
}));
router.post('/check_out', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.query;
    console.log("body", req.body);
    let data = yield (0, checkout_1.default)(request.user, req.body.products);
    res.status(data.status).json(data.content);
}));
router.delete('/delete_from_basket', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let request = req.query;
    let data = yield (0, delete_from_basket_1.default)(request.user, request.product_id);
    res.status(data.status).json(data.content);
}));
exports.default = router;
