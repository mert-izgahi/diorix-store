import type { Request, Response, NextFunction } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../utils/app-errors";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { logger } from "../lib/pino";
import Account from "../models/account.model";


interface IPayload extends JwtPayload {
    id: string;
    email: string;
}

const isTokenExpired = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as IPayload;
        return Date.now() > decoded.exp! * 1000;
    } catch (error) {
        return true
    }
}

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET as string,) as IPayload
    } catch (error) {
        return null
    }
}


export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            throw new UnauthenticatedError("Authentication invalid");
        }

        const isExpired = isTokenExpired(token);

        if (isExpired) {
            throw new UnauthenticatedError("Token expired");
        }

        const payload = verifyToken(token) as IPayload;

        const account = await Account.findById(payload.id).select("-password");

        if (!account) {
            throw new UnauthenticatedError("Authentication invalid");
        }

        if (!account.isActive) {
            throw new UnauthorizedError("Account is not active");
        }

        res.locals.account = account;
    
        next();

    } catch (error) {
        logger.error(error);
        next(error);
    }
}