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
exports.verifyAccessToken = void 0;
const constants_1 = require("../helpers/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return next("Authorization header missing or invalid.");
    }
    const accessToken = authHeader.substring(7);
    try {
        const decode = jsonwebtoken_1.default.verify(accessToken, constants_1.jwtAccessSecretKey);
        const user = yield prisma.user.findUnique({
            where: { id: decode.id }
        });
        if (!user) {
            return next(new Error("User not found."));
        }
        const customReq = req;
        customReq.user = user;
        customReq.isValid = true;
        next();
    }
    catch (error) {
        console.error("Error verifying token:", error);
        if (error.name === "TokenExpiredError") {
            return next(new Error('Access token expired.'));
        }
        else {
            return next(new Error('Invalid access token.'));
        }
    }
});
exports.verifyAccessToken = verifyAccessToken;
