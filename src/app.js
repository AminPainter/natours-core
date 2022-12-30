import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { responseEnhancer } from 'express-response-formatter';

import mainRouter from './routes';

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app
  .use(responseEnhancer())
  .use(cors({ credentials: true, origin: /^/ }))
  .use(mainRouter);

export default app;
