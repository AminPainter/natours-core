import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'A booking must be made for a tour'],
    },

    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'A booking must be created by a user'],
    },

    payment: {
      paymentId: {
        type: String,
        required: [
          true,
          'A payment must have an paymentId generated by razorpay',
        ],
      },
      orderId: {
        type: String,
        required: [
          true,
          'A payment must have an orderId generated by razorpay',
        ],
      },
      amount: {
        type: Number,
        required: [true, 'A payment must have an amount'],
      },
      currency: {
        type: String,
        required: [true, 'A payment must have a currency'],
      },
      method: {
        type: String,
        required: [true, 'A payment must have a method'],
      },
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
