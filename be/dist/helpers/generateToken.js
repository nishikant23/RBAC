"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
// import { user } from "@prisma/client"
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user, jwtsecret, expiryTime) => {
    return jsonwebtoken_1.default.sign(user, jwtsecret, { expiresIn: expiryTime });
};
exports.generateToken = generateToken;
