import { ResponseConstants } from "../Utilities/Constants/ResponseConstants"
import { BaseError } from "./BaseError"

export class AuthorizationError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.UNAUTHORIZED, ResponseConstants.ErrorTypes.UNAUTHORIZED, message)
    }
}