
import * as dotenv from "dotenv";
dotenv.config();

export const jwtAccessSecretKey = process.env.JWT_SECRET;
export const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET;
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";