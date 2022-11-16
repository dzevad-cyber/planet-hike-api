import { RequestHandler } from 'express';

export const getAllUsers: RequestHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {},
  });
};
