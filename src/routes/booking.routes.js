import express from 'express';
import * as bookingController from '../controllers/booking.controller';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.get(
  '/book-tour/:tourId',
  authController.protect,
  bookingController.bookTour
);

router.post(
  '/webhook',
  bookingController.createBookingFromWebhook,
  bookingController.createBooking
);

router.use(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide')
);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

export default router;
