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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const db_1 = __importDefault(require("./DB/db"));
const check_auth_1 = require("./helper/check_auth");
const index_1 = __importDefault(require("./services/auth/index"));
const index_2 = __importDefault(require("./services/company/index"));
const index_3 = __importDefault(require("./services/product/index"));
const index_4 = __importDefault(require("./services/basket/index"));
const index_5 = __importDefault(require("./services/general/index"));
const index_6 = __importDefault(require("./services/search/index"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        console.log(req.headers['authorization'], req.headers['Authorization']);
        const result = yield (0, check_auth_1.check_auth)(req.headers['authorization'] || ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a[process.env.COOKIE_NAME || 'cookie']), (dec) => __awaiter(void 0, void 0, void 0, function* () {
            return true;
        }));
        if (result.status == 200 && ((_b = result === null || result === void 0 ? void 0 : result.decoded) === null || _b === void 0 ? void 0 : _b.id)) {
            const users = yield db_1.default.execute(`SELECT id,first_name,last_name,phone from user where id=${(_c = result === null || result === void 0 ? void 0 : result.decoded) === null || _c === void 0 ? void 0 : _c.id}`);
            if ((_d = users === null || users === void 0 ? void 0 : users[0]) === null || _d === void 0 ? void 0 : _d[0])
                req.query.user = users[0][0];
            else
                req.query.user = {};
        }
    }
    catch (e) {
    }
    finally {
        next();
    }
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/auth', index_1.default);
app.use('/company', index_2.default);
app.use('/product', index_3.default);
app.use('/basket', index_4.default);
app.use('/general', index_5.default);
app.use('/search', index_6.default);
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'welcome' });
}));
app.listen(process.env.PORT ? +process.env.PORT : 8000);
