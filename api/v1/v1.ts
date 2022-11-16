import express from 'express';
import userRouter from '../../routes/user.routes';

const v1_router = express.Router();

v1_router.use('/users', userRouter);

export default v1_router;
