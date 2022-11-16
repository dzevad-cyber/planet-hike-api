import * as dotenv from 'dotenv';
dotenv.config(); // load env variables
import express from 'express';

import router from './api/v1/v1.js';

const app = express();
app.use(express.json());

app.use('/api/v1', router);

export default app;
