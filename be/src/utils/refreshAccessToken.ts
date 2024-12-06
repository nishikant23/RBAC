import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { jwtAccessSecretKey, jwtRefreshSecretKey } from "../helpers/constants";
import { userPayload } from "../payloads/userPayload";
import { generateToken } from "../helpers/generateToken";
const prisma = new PrismaClient();

export const refresAccessToken = async (token: string): Promise<string | null> => {
    try {
        const decode = jwt.verify(token, jwtRefreshSecretKey!) as userPayload
        const user = await prisma.user.findUnique({
            where: { id: decode.id}
        })

        if(!user){
            throw new Error("User not found.")
        }

        return generateToken({id: user.id, username: user.username, role: user.role }, jwtAccessSecretKey!, "20m")
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null; // Return null as signal failure
    }
} 