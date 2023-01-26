import express from 'express';
import * as bookingController from '../controllers/booking.controller';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get(
  '/book-tour/:tourId',
  authController.protect,
  bookingController.bookTour
);
router.post('/', bookingController.createBooking);

export default router;
