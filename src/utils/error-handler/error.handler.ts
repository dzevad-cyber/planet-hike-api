import { ErrorRequestHandler, Response } from 'express';
import { json } from 'stream/consumers';
import AppError from '../appError.js';
import { resJson } from '../response-handler/response.handler.js';

const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperational) {
    resJson(res, err.statusCode, { message: err.message });
  } else {
    console.error('SERVER ERROR ', err);
    resJson(res, 500, null, 'Something went wrong');
  }
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    console.log('DEV ', err);
    resJson(
      res,
      err.statusCode,
      { ...JSON.parse(JSON.stringify(err)), stackTrace: err.stack },
      err.message
    );
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('ERROR ', JSON.parse(JSON.stringify(err)));
    let _err = { ...err };

    if (err.name === 'CastError') {
      _err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    }

    if (err.code === 11000) {
      _err = new AppError(`${err.keyValue.name} already exist`, 400);
    }

    if (err.name === 'ValidationError') {
      let validationErrors: Record<string, string> = { message: err._message };

      for (const key in err.errors) {
        validationErrors[key] = err.errors[key].message;
      }

      _err = new AppError(JSON.stringify(validationErrors), 400);
    }

    sendErrorProd(_err, res);
  }
};

export default errorHandler;
