
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../helpers/constants";
import { refresAccessToken } from "../utils/refreshAccessToken";
import { Request, Response, NextFunction } from "express";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // try {
        const refreshToken = req.cookies[REFRESH_TOKEN];
        if(!refreshToken){
            return next(new Error('Refresh token missing.'))
        }
        const newAccessToken = await refresAccessToken(refreshToken)
        if(!newAccessToken){
            return next(new Error('Refresh token invalid or expired'));
        }

        res.cookie(ACCESS_TOKEN, newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 20*60*1000,
            path: "/",
        })
        // res.json({ accessToken: newAccessToken }); 
        next();
    // } catch (error) {
    //     console.error("Error refreshing access token.", error);
    // }
}