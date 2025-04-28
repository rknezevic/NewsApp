import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../ResponseHandle/ErrorHandler";

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        throw new BadRequestError(errorMessages.join(", "));
    };
    next();
}