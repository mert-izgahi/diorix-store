import type { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/app-errors";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
}