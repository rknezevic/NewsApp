import { ResponseConstants } from "../Utilities/Constants/ResponseConstants";
import { Message } from "../Utilities/Message";
import { BaseError } from "./BaseError";
import { Response } from "express";

export class CreatedSuccessfully extends BaseError{
    constructor(message: string){
        super(ResponseConstants.HttpStatusCodes.CREATED, ResponseConstants.SuccessTypes.CREATED, message)
    }
}
export class NoContentSuccess extends BaseError{
    constructor(message: string){
        super(ResponseConstants.HttpStatusCodes.NO_CONTENT, Message.NEWS.SUCCESS, message)
    }
}
export const okResponse = (res: Response, data?: any) =>{
    return res.status(ResponseConstants.HttpStatusCodes.OK).json(
        data ? { data } : {},
    );
};