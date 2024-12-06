import { jwtDecode } from "jwt-decode"
import { userPayload } from "../payloads/userPayload"

export const isTokenValid = (token : string): boolean => {
    try {
        const decode = jwtDecode(token) as userPayload;
        return decode.exp ? decode.exp < Date.now()/1000 : true;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Treat decoding errors as expired
    }

}