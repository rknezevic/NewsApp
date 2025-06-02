import { ResponseConstants } from "../Utilities/Constants/ResponseConstants";
import { BaseError } from "./BaseError";

export class AuthorizationError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.UNAUTHORIZED, ResponseConstants.ErrorTypes.UNAUTHORIZED, message)
    }
}

export class BadRequestError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.BAD_REQUEST, ResponseConstants.ErrorTypes.BAD_REQUEST, message)
    }
}

export class InternalError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.INTERNAL_SERVER_ERROR, ResponseConstants.ErrorTypes.INTERNAL_SERVER_ERROR, message)
    }
}

export class NotFoundError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.NOT_FOUND, ResponseConstants.ErrorTypes.NOT_FOUND, message)
    }
}

export class ForbiddenError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.FORBIDDEN, ResponseConstants.ErrorTypes.FORBIDDEN, message)
    }
}

export class ConflictError extends BaseError {
    constructor(message : string){
        super(ResponseConstants.HttpStatusCodes.CONFLICT, ResponseConstants.ErrorTypes.CONFLICT, message)
    }
}


