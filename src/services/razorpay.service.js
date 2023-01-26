import razorpay from '../config/razorpay';

// eslint-disable-next-line import/prefer-default-export
export const createOrder = async (amount, notes = {}) =>
  razorpay.orders.create({
    amount: amount * 100,
    currency: 'INR',
    notes,
  });
