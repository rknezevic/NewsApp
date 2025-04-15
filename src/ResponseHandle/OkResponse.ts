import { AppConstants } from "../Utilities/AppConstants";
import { BaseError } from "./BaseError";

export class OkResponse extends BaseError{
    constructor(message: string){
        super(AppConstants.HttpStatusCodes.OK, AppConstants.SuccessTypes.OK, message)
    }
}