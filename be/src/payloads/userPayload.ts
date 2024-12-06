import { JwtPayload } from "jsonwebtoken";

export interface userPayload extends JwtPayload {
    id: number,
    username: string,
    role: string,
}