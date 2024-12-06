"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandlingMiddleware_1 = require("./middlewares/errorHandlingMiddleware");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }))
    .use(express_1.default.json())
    .use((0, cookie_parser_1.default)())
    .use((0, morgan_1.default)("dev"))
    .use('/api/v1', index_1.mainRouter)
    .use(errorHandlingMiddleware_1.catchError)
    .use(errorHandlingMiddleware_1.returnError);
app.listen(3000);
