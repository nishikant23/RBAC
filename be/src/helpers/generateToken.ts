// import { user } from "@prisma/client"
import jwt from "jsonwebtoken"
type tokenPayload  = {
    id : number,
    username : string,
    role : string,

}
export const generateToken = (user: tokenPayload, jwtsecret: string, expiryTime: string): string => {
    return jwt.sign(user, jwtsecret, {expiresIn: expiryTime});
}