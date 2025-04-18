import { ResponseConstants } from "../Utilities/Constants/ResponseConstants"
import { BaseError } from "./BaseError"

export class InternalError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.INTERNAL_SERVER_ERROR, ResponseConstants.ErrorTypes.INTERNAL_SERVER_ERROR, message)
    }
}