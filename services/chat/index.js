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
const db_1 = __importDefault(require("../../DB/db"));
const router = (0, express_1.Router)();
router.get("/history", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield db_1.default.execute(`SELECT * FROM chat
    where sender IN ('${req.query.sender}','${req.query.reciver}') AND reciver IN ('${req.query.sender}','${req.query.reciver}');`);
        res.status(200).json(data[0]);
    }
    catch (e) {
        res.status(500).json({ message: "مشکلی پیش آمده است" });
    }
}));
router.get("/my_rooms", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield db_1.default.execute(`SELECT distinct reciver FROM test.chat
      where sender IN ('${req.query.user}')
      UNION
      SELECT distinct sender FROM test.chat
      where reciver IN ('${req.query.user}');`);
        res.status(200).json(data[0]);
    }
    catch (e) {
        res.status(500).json({ message: "مشکلی پیش آمده است" });
    }
}));
exports.default = router;
