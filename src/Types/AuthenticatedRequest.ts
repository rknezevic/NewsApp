import { IUser } from "../Model/User";
import { JwtPayload } from "./JwtPayload";
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}