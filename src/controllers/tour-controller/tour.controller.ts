import Tour from '../../models/tour-model/tour.model.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import { resJson } from '../../utils/response-handler/response.handler.js';
import handleAsync from '../../utils/handle.async.js';

export const getAllTours = handleAsync(async (req, res, next) => {
  const features = new ApiFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  resJson(res, 200, { count: tours.length, tours });
});

export const createTour = handleAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);

  resJson(res, 201, { tour }, 'Tour successfully created.');
});

export const deleteTour = handleAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) throw new AppError('Tour not found', 404);

  resJson(res, 200, { tour }, 'Tour deleted');
});

export const getTour = handleAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  // console.log(tour);

  // if (!tour) throw new AppError('Tour not found.', 404);

  // resJson(res, 200, { tour });
  // res.status(200).json({
  //   status: 'success',
  //   data: { tour },
  // });
});

export const getTop5Tours = handleAsync(async (req, res, next) => {
  const tours = await Tour.find().sort({ ratingsAverage: -1 }).limit(5);

  res.status(200).json({
    status: 'success',
    count: tours.length,
    data: { tours },
  });
});

export const getTourStats = handleAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$ratingsAverage',
        numTours: { $sum: 1 },
        sumRatings: { $sum: '$ratingsAverage' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    count: stats.length,
    data: { stats },
  });
});

export const getMonthlyPlan = handleAsync(async (req, res, next) => {
  const year = Number(req.params.year);

  const tours = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        count: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { month: 1 },
    },
    {
      $addFields: {
        month: {
          $let: {
            vars: {
              monthsInString: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
            },
            in: {
              $arrayElemAt: ['$$monthsInString', '$month'],
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    count: tours.length,
    data: { tours },
  });
});
