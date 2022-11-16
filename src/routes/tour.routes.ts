import express from 'express';

import * as tourController from '../controllers/tour-controller/tour.controller.js';

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

export default router;
