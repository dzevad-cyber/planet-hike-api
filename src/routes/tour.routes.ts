import express from 'express';

import * as tourController from '../controllers/tour-controller/tour.controller.js';

const router = express.Router();

router.route('/top-5-tours').get(tourController.getTop5Tours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route('/:id').get(tourController.getTour);
// .delete(tourController.deleteTour);

export default router;
