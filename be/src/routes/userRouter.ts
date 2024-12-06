import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import * as dotenv from "dotenv";
import { generateToken } from "../helpers/generateToken";
import { passwordCompare, passwordHashing } from "../helpers/passwordHashing";
import { Request, Response } from "express";
import { ACCESS_TOKEN, jwtAccessSecretKey, jwtRefreshSecretKey, REFRESH_TOKEN } from "../helpers/constants";
import { refreshTokenMiddleware } from "../middlewares/refreshTokenMiddleware";
import { verifyAccessToken } from "../middlewares/verifyAccessToken";
import { customRequest } from "../payloads/customRequest";
import { authenticateMiddleware } from "../middlewares/authenticateMiddleware";

dotenv.config(); // Load environment variables from .env
const prisma  = new PrismaClient(); //instantiate prisma client 

export const userRouter = Router();
type tokenPayload  = {
    id : number,
    username : string,
    role : string,
}

//................................ SIGNUP .......................................//
//@ts-ignore
userRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    try {
        if(!username || !password || !role) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        const existingUser = await prisma.user.findUnique({
            where : { username }
        })
        if(existingUser) {
            return res.status(409).json({
                message : "User already exist, Try to login."
            })
        }
        const hashedPassword = await passwordHashing(password);
        console.log("Hashed Password = "+hashedPassword);
        const newUser = await prisma.user.create({
            data : {
                username: username,
                password : hashedPassword,
                role : role==="5526" ? "ADMIN" : "USER",
            }
        })
    
        //Payload to pass for token-creation.
        const userPayload : tokenPayload = {
            id : newUser!.id,
            username : newUser!.username,
            role : newUser!.role,
        }

        //Access Token Logic
        if(!jwtAccessSecretKey) {
            throw new Error("JWT Secret is not defined, inside .env file.")
        }
        const accessToken = generateToken(userPayload, jwtAccessSecretKey, '20m');
        res.cookie(ACCESS_TOKEN, accessToken, {
            maxAge : 1200*1000,
            path: '/'
        })
    
    
        //Refresh Token Logic  
        if(!jwtRefreshSecretKey) {
            throw new Error("JWT refresh secret not defined, inside .env file.")
        }
        const refreshToken = generateToken(userPayload, jwtRefreshSecretKey, '7d');
        
        const sevenDaysInMillisecond = 7*24*60*60*1000;
        res.cookie(REFRESH_TOKEN, refreshToken, {
            maxAge: sevenDaysInMillisecond,
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            path: '/'
        })
        
        //console.log(`New User,Id : ${newUser.id} username : ${newUser.username}, password: ${newUser.password}, role: ${newUser.role}`)
    
        res.status(201).json({
            message : "User Created Successfully",
            id: userPayload.id,
            username: userPayload.username,
            role: userPayload.role,
            access_token : accessToken,
            refresh_token : refreshToken,
        })
    } catch (error) {
        console.error("Error Creating an User account.", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


//................................ LOGIN .......................................//
userRouter.post('/signin', async ( req: Request, res: Response)  => {
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password : ${password}`)
    try {
        if(!username || !password) {
            throw {
                status : 400,
                message : "All fields are required."
            }
        }
        const existingUser = await prisma.user.findUnique({
            where : { username : username }
        })
    
        if(!existingUser) {
            res.status(404).json({
                message : "User not found."
            })
        }
    
        const dbUserPassword : string | undefined = existingUser?.password 
        
        if(!dbUserPassword) {
            console.log("Users password not found in DB")
            return;
        }
    
        const comparedPassword: boolean = await passwordCompare(password, dbUserPassword);
    
        if(comparedPassword){

            const payload : tokenPayload = {
                id :  existingUser!.id,
                username : existingUser!.username,
                role : existingUser!.role,
            }

            const accessToken = generateToken(payload, jwtAccessSecretKey!, "20m")
                res.cookie(ACCESS_TOKEN, accessToken, {
                    maxAge: 1200*1000,
                    path : "/"
                })
            const refreshToken = generateToken(payload, jwtRefreshSecretKey!, "7d")
                res.cookie(REFRESH_TOKEN, refreshToken, {
                    maxAge: 7*24*60*60*1000,
                    httpOnly : true,
                    secure :true,
                    sameSite : "strict",
                    path :"/",
                })
             res.status(200).json({
                message: "User LoggedIn Successfully, Password matched.",
                id: payload.id,
                username: payload.username,
                role: payload.role,
                Access_Token : accessToken,
                Refresh_Token : refreshToken,
            })
            console.log("User found in DB, and password matched.");
        }else {
            res.status(412).json({
                message : "Existing user password not correct."
            })
            console.log("User found in DB, but  password Not Matched.");
        }
    } catch (error) {
        console.error("Error in loggin the user. Kindly try after some time.", error)
    }
})


//................................ LOGOUT .......................................//
userRouter.post("/logout", (req: Request, res: Response) => {
    try {
        // res.cookie(ACCESS_TOKEN, "", {
        //     expires : new Date(0),
        //     path: "/",
        // })
        // res.cookie(REFRESH_TOKEN, "", {
        //     expires : new Date(0),
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "strict",
        //     path: "/",
        // })
        res.clearCookie(ACCESS_TOKEN)
        res.clearCookie(REFRESH_TOKEN)
    
        res.status(200).json({
            message: "User logged out successfully."
        })
    } catch (error) {
        console.error("Erro in logging out the user.", error)
        res.status(500).json({
            message: "Error logging out the user. Please try again later.",
        });
    }
})


//................................ REFRESH .......................................//
// userRouter.get("/auth/check", authenticateMiddleware, (req, res) => { 
//     try {
//         const user = req.body;
//         res.status(200).json({
//             message: "User Authenticated.",
//             authenticated : true,
//             user : {
//                 id : user.id,
//                 username : user.username,
//                 role : user.role,
//             }
//         })
//     } catch (error) {
//         res.status(500).json({
//             authenticated: false,
//             message: "Internal Server Error."
//         })
//     }
// })
userRouter.get("/dashboard",verifyAccessToken, (req: Request, res: Response) => {
    console.log('Indside Dashboard page Route')
    const customReq = req as customRequest;
    if(customReq.user){
        console.log('Dashboard page')
        res.status(200).json({
            id: customReq.user.id,
            username: customReq.user.username,
            role: customReq.user.role,
        })
    }else {
        console.log('Forbidden')
        res.status(403).send('Forbidden'); // Or redirect to a different page
    }
})
userRouter.get("/adminPage", verifyAccessToken, (req:Request, res: Response) => {
    console.log('Indside Admin page Route')
    const customReq = req as customRequest
    if(customReq.user && customReq.user.role === 'ADMIN') {
        // Allow access
        console.log('Admin page')
        res.status(200).json({
            id: customReq.user.id,
            username: customReq.user.username,
            role: customReq.user.role,
        })
    } else {
        console.log('Forbidden')
        res.status(403).send('Forbidden'); // Or redirect to a different page
    }
})
userRouter.get("/userPage", verifyAccessToken, (req: Request, res: Response) => {
    console.log('Indside User page Route')
    const customReq = req as customRequest
    if(customReq.user) {
        // Allow access
        console.log('User page')
        res.status(200).json({
            id: customReq.user.id,
            username: customReq.user.username,
            role: customReq.user.role,
        })
    } else {
        console.log('Forbidden')
        res.status(403).send('Forbidden'); // Or redirect to a different page
    }
})

//................................ ? .......................................//

userRouter.get("/refresh", refreshTokenMiddleware, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Access token refreshed successfully.'});
})

userRouter.get("/authenticate", authenticateMiddleware, (req: Request, res: Response) => {
    const customReq = req as customRequest
    if(customReq.user && customReq.isValid){
        res.json({ isValid: true, user: customReq.user }); //Send user details if needed
  } else {
    res.status(401).json({ isValid: false, message: 'Unauthorized' }); //Or a more descriptive message
  }
})