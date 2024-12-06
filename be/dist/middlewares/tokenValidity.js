"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = require("jwt-decode");
const constants_1 = require("../helpers/constants");
const generateToken_1 = require("../helpers/generateToken");
const isTokenExpired = (token) => {
    try {
        const decode = (0, jwt_decode_1.jwtDecode)(token);
        if (!decode.exp) { //since, exp? is optinal nethod in jwtDecode, hence neeed to confirm 1st
            throw {
                status: 404,
                message: "Token does not have expiry."
            };
        }
        if (decode.exp < Date.now() / 1000) {
            return true;
        }
        else {
            console.log("Token is not expired yet.");
            return false;
        }
    }
    catch (error) {
        console.error("Error in finding token Expiry.", error);
    }
};
const refreshAccessToken = (token) => {
    try {
        const customUser = JSON.parse(token);
        console.log(`While Refeshing Access Token ::->>> id: ${customUser.id}, username: ${customUser.username}, password: ${customUser.password}, role: ${customUser.role}`);
        return (0, generateToken_1.generateToken)(customUser, constants_1.jwtAccessSecretKey, "15m");
    }
    catch (error) {
        console.error("Error while refreshing Access token.", error);
    }
};
// export const isTokenValid = (accessToken: JwtPayload | string, refreshToken : JwtPayload | string): string | undefined => {
//     // const accessTokenFromCookie = req.cookies[ACCESS_TOKEN];
//     // if(!accessTokenFromCookie) {
//     //     throw {
//     //         status : 404,
//     //         message : "Access Token not found in cookies."
//     //     }
//     // }
//     // if(!jwtAccessSecretKey) {
//     //     throw {
//     //         status : 404,
//     //         message : "Access Token Secret key not found."
//     //     }
//     // }
//     // const isCustomJwtPayload = (payload: JwtPayload | string): payload is customJwtPayload => {
//     //     return (payload as customJwtPayload).id !== undefined &&
//     //         (payload as customJwtPayload).username !== undefined &&
//     //         (payload as customJwtPayload).password !== undefined &&
//     //         (payload as customJwtPayload).role !== undefined;
//     // }
//     // const decode = jwt.verify(accessTokenFromCookie, jwtAccessSecretKey);
//     // const isUserDecoded: boolean =  isCustomJwtPayload(decode);
//     if(!accessToken || !refreshToken){
//         throw {
//             status : 404,
//             message: "Token not defined."
//         }
//     }
//     const parsedAccessToken: string = accessToken.startsWith('Bearer') ? accessToken.split(' ')[1] : accessToken;
//     const parsedRefreshToken: string = refreshToken.startsWith('Bearer') ? refreshToken.split(' ')[1] : refreshToken;
//     try {
//         if(isTokenExpired(parsedRefreshToken)) { //expired == true
//             return ""; //if refreshToken Expired, return EMPTY str, bcos Now, user needs to Login again.
//         }
//         if(isTokenExpired(parsedAccessToken)) { //expired == true
//             const newAccessToken = refreshAccessToken(parsedRefreshToken)
//             return newAccessToken; //if original accessToken expired, return new accessToken.
//         }
//         return parsedAccessToken; //if access token not expired and refreshToken too, return original AccessToken
//     } catch (error) {
//     }
// }
