import express from 'express';
import { getAllUsers } from '../controllers/user-controller/user.controller';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers);

export default userRouter;
