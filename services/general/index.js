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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(path_1.default.resolve('./'), '/public/img'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split(`${'\/'}`)[1]);
    }
});
const filter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    }
    else {
        cb(new Error("Only images are allowed!"));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fieldSize: 5 * 1024 * 1024
    },
    fileFilter: filter
});
router.post('/upload_image', upload.fields([{ name: 'image' }]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const files = req.files;
    res.status(200).json({ url: (_b = (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.filename });
}));
router.use((err, req, res, next) => {
    if (err.message == 'format_error')
        return res.status(500).json({ message: 'فرمت فایل اشتباه است' });
    if (err.message == 'Unexpected field')
        return res.status(500).json({ message: 'فیلد مورد نظر یافت نشد' });
    if (err.message == 'File too large')
        return res.status(500).json({ message: 'فایل بزرگ از 5 مگابایت است' });
    return res.status(500).json({ message: err.message });
});
exports.default = router;
