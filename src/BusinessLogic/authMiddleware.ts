import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Message } from '../Utilities/Message';
import { JwtPayload } from '../Types/JwtPayload'
import { AuthenticatedRequest } from '../Types/AuthenticatedRequest';
import { AuthorizationError, BadRequestError } from '../ResponseHandle/ErrorHandler';
import { config } from '../config/config'
import * as UserRepository from '../Repository/UserRepository';
export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new BadRequestError(Message.AUTH.INVALID_TOKEN);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const user = await UserRepository.findUserById(decoded.id);
    if (!user) {
      throw new AuthorizationError(Message.USER.NOT_FOUND);
    }

    req.user = {
      id: user._id as string,
      email: user.email as string,
      role: user.role,
      name: user.name as string,
    };
    next();
  } catch (error) {
    return next(error);
  }
};

export const permissionCheck = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AuthorizationError(Message.AUTH.ACCESS_DENIED);
    }
    next();
  };
};
