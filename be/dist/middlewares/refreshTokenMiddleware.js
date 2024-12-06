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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenMiddleware = void 0;
const constants_1 = require("../helpers/constants");
const refreshAccessToken_1 = require("../utils/refreshAccessToken");
const refreshTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const refreshToken = req.cookies[constants_1.REFRESH_TOKEN];
    if (!refreshToken) {
        return next(new Error('Refresh token missing.'));
    }
    const newAccessToken = yield (0, refreshAccessToken_1.refresAccessToken)(refreshToken);
    if (!newAccessToken) {
        return next(new Error('Refresh token invalid or expired'));
    }
    res.cookie(constants_1.ACCESS_TOKEN, newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 20 * 60 * 1000,
        path: "/",
    });
    // res.json({ accessToken: newAccessToken }); 
    next();
    // } catch (error) {
    //     console.error("Error refreshing access token.", error);
    // }
});
exports.refreshTokenMiddleware = refreshTokenMiddleware;
