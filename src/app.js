import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { responseEnhancer } from 'express-response-formatter';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import mainRouter from './routes';
import globalErrorHandler from './controllers/error.controller';

const app = express();

app
  .use(express.json())
  .use(morgan('dev'))
  .use(cookieParser())
  .use(responseEnhancer())
  .use(cors({ credentials: true, origin: /^/ }))
  .use(helmet())
  .use(mongoSanitize())
  .use(xss())
  .use(compression())
  .use(
    hpp({
      whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price',
      ],
    })
  )
  .use(
    rateLimit({
      max: 10000,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP, please try again in an hour!',
    })
  )
  .use(mainRouter)
  .use(globalErrorHandler);

export default app;
