import { Request, Response, NextFunction } from "express";

type customError = Error & { status? : number };

export const catchError = (req: Request, res: Response, next : NextFunction) => {
    const error : customError = new Error("Not Found");
    error.status = 404;
    next();
}

export const returnError = (error: customError, req: Request, res: Response, next: NextFunction) => {
    res.json(error.status || 500);
    res.json({
        error : {
            message: error.message,
        },
    });
}