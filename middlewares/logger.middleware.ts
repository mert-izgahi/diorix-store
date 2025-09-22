import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/pino";


export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
}