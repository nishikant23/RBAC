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
exports.refresAccessToken = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../helpers/constants");
const generateToken_1 = require("../helpers/generateToken");
const prisma = new client_1.PrismaClient();
const refresAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decode = jsonwebtoken_1.default.verify(token, constants_1.jwtRefreshSecretKey);
        const user = yield prisma.user.findUnique({
            where: { id: decode.id }
        });
        if (!user) {
            throw new Error("User not found.");
        }
        return (0, generateToken_1.generateToken)({ id: user.id, username: user.username, role: user.role }, constants_1.jwtAccessSecretKey, "20m");
    }
    catch (error) {
        console.error("Error refreshing token:", error);
        return null; // Return null as signal failure
    }
});
exports.refresAccessToken = refresAccessToken;
