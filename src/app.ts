import * as dotenv from 'dotenv';
dotenv.config(); // load env variables
import express from 'express';

// local dependencies
import errorHandler from './utils/error-handler/error.handler.js';
import router from './api/v1/v1.js';
import AppError from './utils/appError.js';
import handleAsync from './utils/handle.async.js';

const app = express();

// global middleware
app.use(express.json());

// rotues
app.use('/api/v1', router);

// catch all routes
app.all(
  '*',
  handleAsync(async (req, res, next) => {
    throw new AppError(`${req.originalUrl} not found`, 404);
  })
);

// error handler
app.use(errorHandler);

export default app;
