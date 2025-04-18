import { ResponseConstants } from "../Utilities/Constants/ResponseConstants"
import { BaseError } from "./BaseError"

export class NotFoundError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.NOT_FOUND, ResponseConstants.ErrorTypes.NOT_FOUND, message)
    }
}