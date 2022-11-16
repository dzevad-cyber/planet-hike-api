import express from 'express';
import * as dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import v1_router from './api/v1/v1';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1', v1_router);

export default app;
