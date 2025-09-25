import type { Request, Response, NextFunction } from "express";

export const tryCatchMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}