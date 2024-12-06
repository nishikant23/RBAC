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
exports.authenticateMiddleware = void 0;
const constants_1 = require("../helpers/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies[constants_1.ACCESS_TOKEN];
    if (!token) {
        return next(new Error("Access token missing"));
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, constants_1.jwtAccessSecretKey);
        const user = yield prisma.user.findUnique({
            where: { id: decode.id }
        });
        if (!user) {
            return next(new Error("User not found."));
        }
        const customReq = req;
        customReq.user = user;
        next();
    }
    catch (error) {
        console.log("Error authenticating the user", error);
    }
});
exports.authenticateMiddleware = authenticateMiddleware;
