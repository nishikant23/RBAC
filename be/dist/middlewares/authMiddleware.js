"use strict";
// import { PrismaClient } from "@prisma/client"
// import { Request, Response, NextFunction } from "express"
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { ACCESS_TOKEN, jwtAccessSecretKey, REFRESH_TOKEN } from "../helpers/constants";
// const prisma = new PrismaClient();
// interface customJwtPayload extends JwtPayload {
//     id : number,
//     username : string,
//     role : string,
// }
// export const authenticateMiddleware = (req : Request, res: Response, next: NextFunction) => {
//     const { id, username, role } = req.body;
//     try {
//         const accessTokenFromCookie =  req.cookies[ACCESS_TOKEN];
//         const refreshTokenFromCookie = req.cookies[REFRESH_TOKEN];
//         if(!accessTokenFromCookie) {
//             return res.status(401).json({message : "Access Token not found in cookies."})
//         }
//         let decode: customJwtPayload | null = null;
//         try{
//             decode = jwt.verify(accessTokenFromCookie, jwtAccessSecretKey!) as customJwtPayload
//         }catch(err){}
//         const  newAccessToken = isTokenValid(accessTokenFromCookie, refreshTokenFromCookie); //check Tokens are expired or not.
//         if(!newAccessToken){ //if newgenerated/refreshed token undefined
//             throw {
//                 status : 500,
//                 message: "Internal error."
//             }
//         }
//         if(newAccessToken === ""){ //if got empty token string means refresh token expired.
//             throw {
//                 status : 401,
//                 message: "Seesion Expired, User need to login again."
//             }
//         } 
//         if( newAccessToken !== accessTokenFromCookie) { //set newAccToken in cookies if oldOne expired.
//             res.cookie(ACCESS_TOKEN, newAccessToken, {
//                 maxAge : 900000,
//                 path : "/"
//             })
//         }
//         if(!jwtAccessSecretKey) {
//             throw {
//                 status : 404,
//                 message : "Access Token Secret key not found."
//             }
//         }
//         const isCustomJwtPayloadValid = (payload : JwtPayload | string): payload is customJwtPayload => {
//             return (payload as customJwtPayload).id !== undefined 
//                    && (payload as customJwtPayload).username !== undefined
//                    && (payload as customJwtPayload).password !== undefined
//                    && (payload as customJwtPayload).role !== undefined;
//         }
//         const decodedUser = jwt.verify(newAccessToken, jwtAccessSecretKey) as customJwtPayload
//         const customUser : boolean = isCustomJwtPayloadValid(decodedUser);
//         if(customUser && decodedUser.id === id && decodedUser.username === username && decodedUser.role === role) {
//             console.log("User is Authenticated.")
//             console.log(`id: ${decodedUser.id}, username : ${decodedUser.username}, role : ${decodedUser.role}`)
//             next();
//         }else {
//             // throw {
//             //     status : 401,
//             //     message : "User is not authenticated."
//             // }
//             res.status(401).json({
//                 message : "User is not authenticated."
//             })
//         }
//     } catch (error) {
//         console.error("Error in authenticating the user.", error);
//     }
// }
