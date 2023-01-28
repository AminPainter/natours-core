import express from 'express';
import tourRouter from './tour.routes';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import bookingRouter from './booking.routes';
import reviewRouter from './review.routes';

const mainRouter = express.Router();

mainRouter.get('/health', (req, res) =>
  res.json({
    status: 'success',
    message: 'Server is healthy, wealthy and sexy!',
  })
);

mainRouter
  .use('/tours', tourRouter)
  .use('/auth', authRouter)
  .use('/users', userRouter)
  .use('/reviews', reviewRouter)
  .use('/bookings', bookingRouter);

export default mainRouter;
