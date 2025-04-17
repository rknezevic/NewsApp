import { AppConstants } from "../Utilities/Constants/ResponseConstants";
import { BaseError } from "./BaseError";

export class CreatedSuccessfully extends BaseError{
    constructor(message: string){
        super(AppConstants.HttpStatusCodes.CREATED, AppConstants.SuccessTypes.CREATED, message)
    }
}