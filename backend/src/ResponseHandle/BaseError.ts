export class BaseError extends Error {
    public readonly statusCode: number;
    public readonly type: string;
  
    constructor(statusCode: number, type: string, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.type = type;
      Error.captureStackTrace(this, this.constructor);
    }
  }