import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { responseEnhancer } from 'express-response-formatter';

import mainRouter from './routes';

const app = express();

app
  .use(morgan('dev'))
  .use(responseEnhancer())
  .use(cors({ credentials: true, origin: /^/ }))
  .use(mainRouter);

export default app;
