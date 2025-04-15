import { AppConstants } from "../Utilities/AppConstants"
import { BaseError } from "./BaseError"

export class AuthorizationError extends BaseError {
    constructor(message : string){
        super(AppConstants.HttpStatusCodes.UNAUTHORIZED, AppConstants.ErrorTypes.UNAUTHORIZED, message)
    }
}