import { ResponseConstants } from "../Utilities/Constants/ResponseConstants"
import { BaseError } from "./BaseError"

export class BadRequestError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.BAD_REQUEST, ResponseConstants.ErrorTypes.BAD_REQUEST, message)
    }
}