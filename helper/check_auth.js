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
exports.check_auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const check_auth = (token, state) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        return ({ message: 'No token provided', status: 401 });
    }
    else {
        try {
            var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || 'iust');
            const a = yield state(decoded);
            if (a)
                return { status: 200, decoded: decoded };
            else
                return ({ message: 'Not permission', status: 403 });
        }
        catch (err) {
            return ({ message: 'Token is not true', status: 401 });
        }
    }
});
exports.check_auth = check_auth;
