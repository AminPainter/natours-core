import express from 'express';
import tourRouter from './tour.routes';

const mainRouter = express.Router();

mainRouter
  .use('/tours', tourRouter)
  .use('/users', tourRouter)
  .use('/reviews', tourRouter)
  .use('/bookings', tourRouter);

export default mainRouter;
