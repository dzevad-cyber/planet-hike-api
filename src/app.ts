import * as dotenv from 'dotenv';
dotenv.config(); // load env variables
import express, { NextFunction } from 'express';

import router from './api/v1/v1.js';

const app = express();
app.use(express.json());

app.use('/api/v1', router);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({
//     status: 'fail',
//     data: { err },
//   });
// });

export default app;
