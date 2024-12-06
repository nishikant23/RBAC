"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.userRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const dotenv = __importStar(require("dotenv"));
const generateToken_1 = require("../helpers/generateToken");
const passwordHashing_1 = require("../helpers/passwordHashing");
const constants_1 = require("../helpers/constants");
const refreshTokenMiddleware_1 = require("../middlewares/refreshTokenMiddleware");
const verifyAccessToken_1 = require("../middlewares/verifyAccessToken");
dotenv.config(); // Load environment variables from .env
const prisma = new client_1.PrismaClient(); //instantiate prisma client 
exports.userRouter = (0, express_1.Router)();
//................................ SIGNUP .......................................//
//@ts-ignore
exports.userRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    try {
        if (!username || !password || !role) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        const existingUser = yield prisma.user.findUnique({
            where: { username }
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exist, Try to login."
            });
        }
        const hashedPassword = yield (0, passwordHashing_1.passwordHashing)(password);
        console.log("Hashed Password = " + hashedPassword);
        const newUser = yield prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                role: role === "5526" ? "ADMIN" : "USER",
            }
        });
        //Payload to pass for token-creation.
        const userPayload = {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
        };
        //Access Token Logic
        if (!constants_1.jwtAccessSecretKey) {
            throw new Error("JWT Secret is not defined, inside .env file.");
        }
        const accessToken = (0, generateToken_1.generateToken)(userPayload, constants_1.jwtAccessSecretKey, '20m');
        res.cookie(constants_1.ACCESS_TOKEN, accessToken, {
            maxAge: 1200 * 1000,
            path: '/'
        });
        //Refresh Token Logic  
        if (!constants_1.jwtRefreshSecretKey) {
            throw new Error("JWT refresh secret not defined, inside .env file.");
        }
        const refreshToken = (0, generateToken_1.generateToken)(userPayload, constants_1.jwtRefreshSecretKey, '7d');
        const sevenDaysInMillisecond = 7 * 24 * 60 * 60 * 1000;
        res.cookie(constants_1.REFRESH_TOKEN, refreshToken, {
            maxAge: sevenDaysInMillisecond,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
        });
        //console.log(`New User,Id : ${newUser.id} username : ${newUser.username}, password: ${newUser.password}, role: ${newUser.role}`)
        res.status(201).json({
            message: "User Created Successfully",
            id: userPayload.id,
            username: userPayload.username,
            role: userPayload.role,
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    }
    catch (error) {
        console.error("Error Creating an User account.", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
//................................ LOGIN .......................................//
exports.userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password : ${password}`);
    try {
        if (!username || !password) {
            throw {
                status: 400,
                message: "All fields are required."
            };
        }
        const existingUser = yield prisma.user.findUnique({
            where: { username: username }
        });
        if (!existingUser) {
            res.status(404).json({
                message: "User not found."
            });
        }
        const dbUserPassword = existingUser === null || existingUser === void 0 ? void 0 : existingUser.password;
        if (!dbUserPassword) {
            console.log("Users password not found in DB");
            return;
        }
        const comparedPassword = yield (0, passwordHashing_1.passwordCompare)(password, dbUserPassword);
        if (comparedPassword) {
            const payload = {
                id: existingUser.id,
                username: existingUser.username,
                role: existingUser.role,
            };
            const accessToken = (0, generateToken_1.generateToken)(payload, constants_1.jwtAccessSecretKey, "20m");
            res.cookie(constants_1.ACCESS_TOKEN, accessToken, {
                maxAge: 1200 * 1000,
                path: "/"
            });
            const refreshToken = (0, generateToken_1.generateToken)(payload, constants_1.jwtRefreshSecretKey, "7d");
            res.cookie(constants_1.REFRESH_TOKEN, refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
            });
            res.status(200).json({
                message: "User LoggedIn Successfully, Password matched.",
                id: payload.id,
                username: payload.username,
                role: payload.role,
                Access_Token: accessToken,
                Refresh_Token: refreshToken,
            });
            console.log("User found in DB, and password matched.");
        }
        else {
            res.status(412).json({
                message: "Existing user password not correct."
            });
            console.log("User found in DB, but  password Not Matched.");
        }
    }
    catch (error) {
        console.error("Error in loggin the user. Kindly try after some time.", error);
    }
}));
//................................ LOGOUT .......................................//
exports.userRouter.post("/logout", (req, res) => {
    try {
        // res.cookie(ACCESS_TOKEN, "", {
        //     expires : new Date(0),
        //     path: "/",
        // })
        // res.cookie(REFRESH_TOKEN, "", {
        //     expires : new Date(0),
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "strict",
        //     path: "/",
        // })
        res.clearCookie(constants_1.ACCESS_TOKEN);
        res.clearCookie(constants_1.REFRESH_TOKEN);
        res.status(200).json({
            message: "User logged out successfully."
        });
    }
    catch (error) {
        console.error("Erro in logging out the user.", error);
        res.status(500).json({
            message: "Error logging out the user. Please try again later.",
        });
    }
});
//................................ REFRESH .......................................//
// userRouter.get("/auth/check", authenticateMiddleware, (req, res) => { 
//     try {
//         const user = req.body;
//         res.status(200).json({
//             message: "User Authenticated.",
//             authenticated : true,
//             user : {
//                 id : user.id,
//                 username : user.username,
//                 role : user.role,
//             }
//         })
//     } catch (error) {
//         res.status(500).json({
//             authenticated: false,
//             message: "Internal Server Error."
//         })
//     }
// })
exports.userRouter.get("/dashboard", verifyAccessToken_1.verifyAccessToken, (req, res) => {
    console.log('Indside Dashboard page Route');
    const customReq = req;
    if (customReq.user) {
        console.log('Dashboard page');
        res.status(200).json({
            id: customReq.user.id,
            username: customReq.user.username,
            role: customReq.user.role,
        });
    }
    else {
        console.log('Forbidden');
        res.status(403).send('Forbidden'); // Or redirect to a different page
    }
});
exports.userRouter.get("/adminPage", verifyAccessToken_1.verifyAccessToken, (req, res) => {
    console.log('Indside Admin page Route');
    const customReq = req;
    if (customReq.user && customReq.user.role === 'ADMIN') {
        // Allow access
        console.log('Admin page');
        res.status(200).json({
            id: customReq.user.id,
            username: customReq.user.username,
            role: customReq.user.role,
        });
    }
    else {
        console.log('Forbidden');
        res.status(403).send('Forbidden'); // Or redirect to a different page
    }
});
exports.userRouter.get("/userPage", verifyAccessToken_1.verifyAccessToken, (req, res) => {
    console.log('Indside User page Route');
    const customReq = req;
    if (customReq.user) {
        // Allow access
        console.log('User page');
        res.status(200).json({
            id: customReq.user.id,
            username: customReq.user.username,
            role: customReq.user.role,
        });
    }
    else {
        console.log('Forbidden');
        res.status(403).send('Forbidden'); // Or redirect to a different page
    }
});
//................................ ? .......................................//
exports.userRouter.get("/refresh", refreshTokenMiddleware_1.refreshTokenMiddleware, (req, res) => {
    res.status(200).json({ message: 'Access token refreshed successfully.' });
});
exports.userRouter.get("/authenticate", verifyAccessToken_1.verifyAccessToken, (req, res) => {
    const customReq = req;
    if (customReq.user && customReq.isValid) {
        res.json({ isValid: true, user: customReq.user }); //Send user details if needed
    }
    else {
        res.status(401).json({ isValid: false, message: 'Unauthorized' }); //Or a more descriptive message
    }
});
