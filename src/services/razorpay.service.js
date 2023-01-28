import crypto from 'crypto';
import razorpay from '../config/razorpay';

export const createOrder = async (amount, notes = {}) =>
  razorpay.orders.create({
    amount: amount * 100,
    currency: 'INR',
    notes,
  });

export const isPaymentVerified = (reqBody, razorpaySignature) => {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(JSON.stringify(reqBody))
    .digest('hex');

  return expectedSignature === razorpaySignature;
};
