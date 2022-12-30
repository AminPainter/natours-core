import express from 'express';
import tourRouter from './tour.routes';

const mainRouter = express.Router();

mainRouter.get('/health', (req, res) =>
  res.json({
    status: 'success',
    message: 'Server is healthy, wealthy and sexy!',
  })
);

mainRouter
  .use('/tours', tourRouter)
  .use('/users', tourRouter)
  .use('/reviews', tourRouter)
  .use('/bookings', tourRouter);

export default mainRouter;
