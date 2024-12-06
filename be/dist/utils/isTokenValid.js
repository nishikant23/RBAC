"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = void 0;
const jwt_decode_1 = require("jwt-decode");
const isTokenValid = (token) => {
    try {
        const decode = (0, jwt_decode_1.jwtDecode)(token);
        return decode.exp ? decode.exp < Date.now() / 1000 : true;
    }
    catch (error) {
        console.error("Error decoding token:", error);
        return true; // Treat decoding errors as expired
    }
};
exports.isTokenValid = isTokenValid;
