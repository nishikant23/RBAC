import { Request } from "express";
import { userPayload } from "./userPayload";
// import { user } from "@prisma/client";

export interface customRequest extends Request {
    user? : userPayload;
    isValid: boolean;
}