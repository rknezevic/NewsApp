import { AppConstants } from "../Utilities/AppConstants"
import { BaseError } from "./BaseError"

export class BadRequestError extends BaseError {
    constructor(message : string){
        super(AppConstants.HttpStatusCodes.BAD_REQUEST, AppConstants.ErrorTypes.BAD_REQUEST, message)
    }
}