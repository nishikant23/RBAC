import { Request, Response, NextFunction } from "express";
import { ACCESS_TOKEN, jwtAccessSecretKey } from "../helpers/constants";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { userPayload } from "../payloads/userPayload";
import { customRequest } from "../payloads/customRequest";
const prisma = new PrismaClient();

export const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token  = req.cookies[ACCESS_TOKEN];
    if(!token) {
        return next(new Error("Access token missing"));
    }

    try {
        const decode = jwt.verify(token, jwtAccessSecretKey!) as userPayload
        const user = await prisma.user.findUnique({
            where : {id : decode.id}
        })

        if(!user) {
            return next(new Error("User not found."))
        }

        const customReq = req as customRequest;
        customReq.user = user;
        next();
    } catch (error) {
        console.log("Error authenticating the user", error)   
    }
}