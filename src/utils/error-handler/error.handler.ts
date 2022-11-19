import { ErrorRequestHandler, Response } from 'express';
import AppError from '../appError';

const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stackTrace: err.stack,
    error: err,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode, status, message } = err;
  res.status = status;

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    res.json({ status, message, stack: err.stack, error: err });
  }

  if (process.env.NODE_ENV === 'production') res.json({ status, message });
};

export default errorHandler;
