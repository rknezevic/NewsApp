import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Message } from '../Utilities/Message';
import { JwtPayload } from '../Types/JwtPayload'
import { AuthenticatedRequest } from '../Types/AuthenticatedRequest';


export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: Message.AUTH.INVALID_TOKEN });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: Message.AUTH.INVALID_TOKEN });
  }
};

export const permissionCheck = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: Message.PERMISSIONS.FORBIDDEN });
      return;
    }

    next();
  };
};
