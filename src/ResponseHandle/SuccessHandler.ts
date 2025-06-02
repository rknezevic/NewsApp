import { ResponseConstants } from "../Utilities/Constants/ResponseConstants";
import { Message } from "../Utilities/Message";
import { BaseError } from "./BaseError";
import { Response } from "express";

export const CreatedSuccessfully = <T = any>(res: Response, data?: T): Response => {
    if (data === undefined) {
        return res.status(ResponseConstants.HttpStatusCodes.CREATED).json({});
    }
    return res.status(ResponseConstants.HttpStatusCodes.CREATED).json(data);
};

export const NoContentResponse = (res: Response): Response => {
    return res.status(ResponseConstants.HttpStatusCodes.NO_CONTENT).json({});
};
export const okResponse = <T = any>(res: Response, data?: T):Response => {
    if (data === undefined) {
        return res.status(ResponseConstants.HttpStatusCodes.OK).json({});
    }
    return res.status(ResponseConstants.HttpStatusCodes.OK).json(data);
};
