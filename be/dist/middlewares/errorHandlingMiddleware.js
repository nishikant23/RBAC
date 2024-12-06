"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnError = exports.catchError = void 0;
const catchError = (req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next();
};
exports.catchError = catchError;
const returnError = (error, req, res, next) => {
    res.json(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
};
exports.returnError = returnError;
