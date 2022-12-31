import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { responseEnhancer } from 'express-response-formatter';
import cookieParser from 'cookie-parser';

import mainRouter from './routes';

const app = express();

app
  .use(morgan('dev'))
  .use(cookieParser())
  .use(responseEnhancer())
  .use(cors({ credentials: true, origin: /^/ }))
  .use(mainRouter);

export default app;
