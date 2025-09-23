import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/app-errors";

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            success: false,
            result: {
                title: err.title,
                message: err.message,
                status: err.status
            }
        })
    }


    return res.status(500).json({
        success: false,
        result: {
            title: "Internal Server Error",
            message: "Something went wrong",
            status: 500
        }
    })
}