import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Message } from '../Utilities/Message';
import { JwtPayload } from '../Types/JwtPayload'
import { AuthenticatedRequest } from '../Types/AuthenticatedRequest';
import { BadRequestError } from '../ResponseHandle/BadRequestError';
import { AuthorizationError } from '../ResponseHandle/AuthorizationError';
import { config } from '../config/config'

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new BadRequestError(Message.AUTH.INVALID_TOKEN);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return next(error);
  }
};

export const permissionCheck = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AuthorizationError(Message.AUTH.ACCESS_DENIED);
    }
    next();
  };
};
