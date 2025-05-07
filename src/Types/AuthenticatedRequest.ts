import { IUserAuth } from "./IUserAuth";
import { JwtPayload } from "./JwtPayload";
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: IUserAuth;
}