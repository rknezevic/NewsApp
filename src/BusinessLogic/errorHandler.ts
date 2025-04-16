import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const type = err.type || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Something went wrong.';

  res.status(statusCode).json({
    type,
    message,
  });
};