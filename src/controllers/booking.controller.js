import { AppError, catchAsync } from '../utils';
import * as razorpayService from '../services/razorpay.service';
import Tour from '../models/tour.model';
import Booking from '../models/booking.model';
import * as handlerFactory from './factory';

export const bookTour = catchAsync(async (req, res, next) => {
  const { tourId } = req.params;
  if (!tourId) throw new AppError('No tour was specified with the request');

  const tour = await Tour.findById(tourId);
  if (!tour) throw new AppError('Invalid tour id was provided');

  res.formatter.created(
    await razorpayService.createOrder(tour.price, {
      tourId: tour.id,
      userId: req.user.id,
    })
  );
});

export const createBookingFromWebhook = (req, res, next) => {
  const payment = req.body.payload.payment.entity;
  if (
    !razorpayService.isPaymentVerified(
      req.body,
      req.headers['x-razorpay-signature']
    )
  )
    return next(
      new AppError('Unable to book tour because of suspicious payment')
    );

  req.body = {
    tourId: payment.notes.tourId,
    userId: payment.notes.userId,
    payment: {
      paymentId: payment.id,
      orderId: payment.order_id,
      amount: payment.amount,
      currency: payment.currency,
      method: payment.method,
    },
  };

  next();
};

export const createBooking = handlerFactory.createOne(Booking);
export const getAllBookings = handlerFactory.getAll(Booking);
export const getBooking = handlerFactory.getOne(Booking);
export const updateBooking = handlerFactory.updateOne(Booking);
export const deleteBooking = handlerFactory.deleteOne(Booking);
