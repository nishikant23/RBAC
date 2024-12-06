import { Request, Response, NextFunction } from "express"
import { jwtAccessSecretKey } from "../helpers/constants"
import { userPayload } from "../payloads/userPayload";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { customRequest } from "../payloads/customRequest";

const prisma = new PrismaClient();


export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return next("Authorization header missing or invalid.")
    }
    const accessToken = authHeader.substring(7);

    try {
        const decode = jwt.verify(accessToken, jwtAccessSecretKey!) as userPayload;

        const user = await prisma.user.findUnique({
            where : { id : decode.id}
        })
        if(!user) {
            return next(new Error("User not found."))
        }
        const customReq = req as customRequest;
        customReq.user = user
        customReq.isValid = true
        next();
    } catch (error: any) {
        console.error("Error verifying token:", error);
        if(error.name === "TokenExpiredError"){
            return next(new Error('Access token expired.'));
        }else {
            return next(new Error('Invalid access token.'));
        }
    }
}