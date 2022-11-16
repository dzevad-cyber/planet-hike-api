import { RequestHandler } from 'express';
import Tour from '../../models/tour-model/tour.model.js';

export const getAllTours: RequestHandler = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { msg: 'getAllTours' },
  });
};

export const createTour: RequestHandler = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      data: { err },
    });
  }
};
