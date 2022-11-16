import express from 'express';
import userRouter from '../../routes/user.routes.js';
import tourRouter from '../../routes/tour.routes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/tours', tourRouter);

export default router;
