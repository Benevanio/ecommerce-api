/* eslint-disable prettier/prettier */
import { NextFunction, Response } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message,
    });
  }
   console.error(err);
  return res.status(500).json({
    message: 'Internal Server Error',
  });


}
