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
exports.chat_server = void 0;
const check_auth_1 = require("../../helper/check_auth");
const db_1 = __importDefault(require("../../DB/db"));
const save_msg = (from, to, text) => {
    try {
        db_1.default.execute(`INSERT INTO chat (sender,reciver,text)
  VALUES('${from}','${to}','${text}')`);
    }
    catch (e) { }
};
function chat_server(io) {
    io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        console.log(socket.id, socket.handshake.headers.authorization);
        const result = yield (0, check_auth_1.check_auth)(socket.handshake.headers.authorization, (dec) => __awaiter(this, void 0, void 0, function* () {
            return true;
        }));
        if (result.status == 200 && ((_a = result === null || result === void 0 ? void 0 : result.decoded) === null || _a === void 0 ? void 0 : _a.id)) {
            const users = yield db_1.default.execute(`SELECT for_user as id , json_arrayagg(url) as company_arr FROM test.company
        where for_user=${(_b = result === null || result === void 0 ? void 0 : result.decoded) === null || _b === void 0 ? void 0 : _b.id}
        group by for_user;`);
            if ((_c = users === null || users === void 0 ? void 0 : users[0]) === null || _c === void 0 ? void 0 : _c[0])
                socket.data.user = users[0][0];
        }
        if (((_d = socket.data) === null || _d === void 0 ? void 0 : _d.user) || ((_e = result === null || result === void 0 ? void 0 : result.decoded) === null || _e === void 0 ? void 0 : _e.id)) {
            console.log(`socket join => ${result.decoded.id}`);
            socket.join((_f = result === null || result === void 0 ? void 0 : result.decoded) === null || _f === void 0 ? void 0 : _f.id);
            (_h = (_g = socket.data.user) === null || _g === void 0 ? void 0 : _g.company_arr) === null || _h === void 0 ? void 0 : _h.forEach((element) => {
                console.log(`socket join => ${element}`);
                socket.join(element);
            });
            socket.on("message", (msg) => {
                let form = result.decoded.id;
                if (msg.from && socket.data.user.company_arr) {
                    if (socket.data.user.company_arr.includes(msg.from))
                        form = msg.from;
                }
                if (msg.to) {
                    console.log("message : " + msg);
                    save_msg(form, msg.to, msg.text);
                    io.to(msg.to).emit("message", Object.assign(Object.assign({}, msg), { from: form }));
                }
            });
        }
        else {
            socket.disconnect();
        }
    }));
}
exports.chat_server = chat_server;
