import express from 'express';
import tourRouter from './tour.routes';
import authRouter from './auth.routes';
import userRouter from './user.routes';

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
  .use('/reviews', tourRouter)
  .use('/bookings', tourRouter);

export default mainRouter;
