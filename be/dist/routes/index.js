"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter.use('/user', userRouter_1.userRouter);
